import { computed, makeObservable, observable, runInAction } from 'mobx'
import { BigNumber, ethers } from 'ethers'
import Decimal from 'decimal.js'
import { TaskEntity } from './Task.entity'
import { Erc20Store } from './Erc20.entity'
import { TheGraphBucket } from '../../types/all-types'
import { RootStore } from '../RootStore'
import { mockTasks } from '../../utils/mocked'
import { EMPTY_CONTRACT_ADDRESS } from '../../lib/constants'
import { slugify } from '../../utils/buckets-utils'
import { Bucket__factory } from '../../generated/factories/Bucket__factory'

import { ERC20__factory } from '../../generated/factories/ERC20__factory'

export class BucketEntity {
  root: RootStore
  loading = true
  id: string
  name: string
  nameAsSlug: string
  level: number
  url = ''
  slug: string[] = []
  parent?: BucketEntity
  children: BucketEntity[] = []
  tasks: TaskEntity[] = []
  token: Erc20Store
  parentAddress?: string
  description: string
  owners: string[]
  allocation = new Decimal('0')
  _topLevel?: BucketEntity

  constructor(root: RootStore, { data }: { data: TheGraphBucket }) {
    this.root = root
    this.id = ethers.utils.getAddress(data.id)
    this.name = data.name
    this.nameAsSlug = slugify(data.name)
    this.description = data.data.description
    this.owners = data.owners
    this.level = 0
    this.parentAddress = EMPTY_CONTRACT_ADDRESS === data.parent ? undefined : data.parent
    this.token = new Erc20Store({
      root: this.root,
      tokenAddress: ethers.utils.getAddress(data.token),
      storeKey: `${data.name.replace(/ /g, '')}token`.toLowerCase(),
      symbolOverride: 'ETH',
    })

    makeObservable(this, {
      tasks: observable,
      allocation: observable,
      children: observable,
      topLevel: computed,
      token: observable,
    })

    this.init()
  }

  get topLevel(): BucketEntity | void {
    return this.level === 1 ? this : this._topLevel
  }

  addChild = (child: BucketEntity): void => {
    this.children.push(child)
  }

  setLevel = (level: number): void => {
    this.level = level
  }

  setParent = (parent: BucketEntity): void => {
    this.parent = parent
  }

  setStructure = () => {
    if (this.parent) {
      // eslint-disable-next-line prefer-destructuring
      let parent: BucketEntity | void = this.parent
      const slug = []
      let lastParent

      while (parent) {
        if (parent) {
          lastParent = parent
          slug.unshift(parent.nameAsSlug)
          parent = parent.parent
        }
      }

      this._topLevel = lastParent
      slug.push(this.nameAsSlug)
      this.slug = slug
      this.url = `/${slug.join('/')}`
    } else {
      this.url = `/${this.nameAsSlug}`
      this.slug = [this.nameAsSlug]
    }
  }

  init = (): void => {
    this.tasks = mockTasks
      .filter((task) => task.bucket === this.id)
      .map((task) => new TaskEntity(this.root, { task }))

    this.getAllocation()
  }

  getAllocation = async (): Promise<void> => {
    try {
      const allocation = await this.token.balanceOf(this.id)
      console.log('Getting allocation', allocation)

      if (allocation !== undefined) {
        const [balance] = allocation
        runInAction(() => {
          this.allocation = new Decimal(ethers.utils.formatEther(balance))
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  fund = async (amount: BigNumber): Promise<void> => {
    if (this.root.web3Store.signer && this.root.web3Store.signerState.address) {
      // const erc20Contract = ERC20__factory.connect(this.token, this.root.web3Store.signer)
      // const erc20Contract = new Erc20Store(this.root, this.token)
      const INFINITE = BigNumber.from(
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      )

      const resAllowance = await this.token.allowance(
        this.root.web3Store.signerState.address,
        this.id
      )

      console.log({ resAllowance })
      if (resAllowance === undefined) return
      const [allowance] = resAllowance

      if (allowance.lt(amount)) {
        await this.token.approve(ethers.utils.getAddress(this.id), INFINITE)
      }

      const contract = Bucket__factory.connect(
        ethers.utils.getAddress(this.id),
        this.root.web3Store.signer
      )

      await contract.fundBucket(amount)
      // await this.getAllocation()
    }
  }

  get signerIsOwner(): boolean {
    if (!this.root.web3Store.signerState.address) return false
    return this.owners.includes(this.root.web3Store.signerState.address)
  }
}
