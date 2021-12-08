import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import { BigNumber, ethers } from 'ethers'
import Decimal from 'decimal.js'
import { TaskEntity } from './Task.entity'
import { Erc20Store } from './Erc20.entity'
import { BucketMetaData, TheGraphBucket } from '../../types/all-types'
import { RootStore } from '../RootStore'
import { mockTasks } from '../../utils/mocked'
import { EMPTY_CONTRACT_ADDRESS } from '../../lib/constants'
import { slugify } from '../../utils/buckets-utils'
import { Bucket__factory } from '../../generated/factories/Bucket__factory'

import { ERC20__factory } from '../../generated/factories/ERC20__factory'
import ceramic from '../../utils/services/ceramic'

export class BucketEntity {
  root: RootStore
  loading = true
  id: string
  name: string
  nameAsSlug: string
  level: number

  tokenAddress: string
  url = ''
  slug: string[] = []
  parent?: BucketEntity
  children: BucketEntity[] = []
  tasks: TaskEntity[] = []
  token: Erc20Store
  parentAddress?: string
  owners: string[]
  _topLevel?: BucketEntity
  ceramicId: string
  creatingTask = false
  data?: BucketMetaData = undefined
  color = ''

  constructor(root: RootStore, { data }: { data: TheGraphBucket }) {
    this.root = root
    this.id = ethers.utils.getAddress(data.id)
    this.name = data.name
    this.nameAsSlug = slugify(data.name)
    this.ceramicId = data.ceramicId
    this.owners = data.owners
    this.level = 0
    this.parentAddress = EMPTY_CONTRACT_ADDRESS === data.parent ? undefined : data.parent
    this.token = new Erc20Store({
      root: this.root,
      tokenAddress: ethers.utils.getAddress(data.token),
      storeKey: `${data.name}token`,
      // symbolOverride: 'ETH',
    })
    this.tokenAddress = data.token

    makeObservable(this, {
      topLevel: computed,
      allocation: computed,
      color: observable,
      tasks: observable,
      children: observable,
      data: observable,
      setColor: action,
    })
  }

  get topLevel(): BucketEntity | void {
    return this.level === 1 ? this : this._topLevel
  }

  get allocation(): Decimal {
    const balance = this.token.balanceOf(this.id)

    if (balance) {
      return new Decimal(ethers.utils.formatEther(balance[0]))
    }

    return new Decimal('0')
  }

  load = async () => {
    try {
      const data = await ceramic.read<BucketMetaData>(this.ceramicId)

      if (data) {
        runInAction(() => {
          this.data = data
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  setColor = () => {
    if (!this.data) {
      return
    }

    if (this.data?.primaryColor) {
      this.color = this.data.primaryColor
      return
    }

    let { parent } = this
    let _color

    while (parent && !_color) {
      if (parent) {
        if (parent.data?.primaryColor) {
          _color = parent.data.primaryColor
        }
        parent = parent.parent
      }
    }

    this.color = _color || '#321c6f'
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

    this.setColor()
  }

  init = (): void => {
    this.tasks = mockTasks
      .filter((task) => task.bucket === this.id)
      .map((task) => new TaskEntity(this.root, { task }))

    this.getAllocation()
  }

  getAllocation = async (): Promise<void> => {
    try {
      await this.token.balanceOf(this.id)
    } catch (e) {
      console.error(e)
    }
  }

  fund = async (amount: BigNumber): Promise<void> => {
    if (
      this.root.web3Store.signer &&
      this.root.web3Store.signerState.address &&
      this.token.address
    ) {
      const erc20Contract = ERC20__factory.connect(this.token.address, this.root.web3Store.signer)
      // const erc20Contract = new Erc20Store(this.root, this.token)
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

  createTask = async ({
    data,
    deadline,
    issuers,
    approvers,
  }: {
    data: string
    deadline: number
    issuers: string[]
    approvers: string[]
  }): Promise<void> => {
    if (this.root.web3Store.signer && this.root.web3Store.signerState.address) {
      runInAction(() => {
        this.creatingTask = true
      })
      try {
        const contract = Bucket__factory.connect(
          ethers.utils.getAddress(this.id),
          this.root.web3Store.signer
        )

        await contract.createTask(data, deadline, issuers, approvers)
      } catch (e) {
        this.root.uiStore.errorToast('Error creating task', e)
      } finally {
        runInAction(() => {
          this.creatingTask = false
        })
      }
    }
  }

  get signerIsOwner(): boolean {
    if (!this.root.web3Store.signerState.address) return false
    return this.owners.includes(this.root.web3Store.signerState.address)
  }
}
