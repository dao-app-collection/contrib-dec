import { computed, makeObservable, observable, runInAction } from 'mobx'
import { BigNumber } from '@ethersproject/bignumber'
import { ethers } from 'ethers'
import Decimal from 'decimal.js'
import { TaskEntity } from './Task.entity'
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
  parentAddress?: string
  token: string
  description: string
  owners: string[]
  tokenSymbol = 'ETH'
  allocation = new Decimal('0')
  _topLevel?: BucketEntity

  constructor(root: RootStore, { data }: { data: TheGraphBucket }) {
    this.root = root
    this.id = ethers.utils.getAddress(data.id)
    this.token = ethers.utils.getAddress(data.token)
    this.name = data.name
    this.nameAsSlug = slugify(data.name)
    this.description = data.data.description
    this.owners = data.owners
    this.level = 0
    this.parentAddress = EMPTY_CONTRACT_ADDRESS === data.parent ? undefined : data.parent

    makeObservable(this, {
      tasks: observable,
      allocation: observable,
      children: observable,
      topLevel: computed,
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
      const erc20Contract = ERC20__factory.connect(this.token, this.root.web3Store.coreProvider)
      const allocation = await erc20Contract.balanceOf(this.id)

      runInAction(() => {
        this.allocation = new Decimal(ethers.utils.formatEther(allocation))
      })
    } catch (e) {
      console.error(e)
    }
  }

  fund = async (amount: BigNumber): Promise<void> => {
    if (this.root.web3Store.signer && this.root.web3Store.signerState.address) {
      const erc20Contract = ERC20__factory.connect(this.token, this.root.web3Store.signer)
      const INFINITE = BigNumber.from(
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      )

      const allowance = await erc20Contract.allowance(
        this.root.web3Store.signerState.address,
        this.id
      )

      if (allowance.lt(amount)) {
        await erc20Contract.approve(ethers.utils.getAddress(this.id), INFINITE)
      }

      const contract = Bucket__factory.connect(
        ethers.utils.getAddress(this.id),
        this.root.web3Store.signer
      )

      await contract.fundBucket(amount)
      await this.getAllocation()
    }
  }
}
