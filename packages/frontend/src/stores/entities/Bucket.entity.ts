import { action, autorun, computed, makeObservable, observable, reaction, runInAction } from 'mobx'
import { BigNumber, ethers } from 'ethers'
import Decimal from 'decimal.js'
import { TaskEntity } from './Task.entity'
import { Erc20Store } from './Erc20.entity'
import { BucketMetaData, TheGraphBucket } from '../../types/all-types'
import { RootStore } from '../RootStore'
import { EMPTY_CONTRACT_ADDRESS } from '../../lib/constants'
import { slugify } from '../../utils/buckets-utils'
import { Bucket__factory } from '../../generated/factories/Bucket__factory'
import { TaskCreatedEvent } from '../../generated/Bucket'

import { ERC20__factory } from '../../generated/factories/ERC20__factory'
import ceramic from '../../utils/services/ceramic'

export class BucketEntity {
  root: RootStore
  loading = true
  id: string
  _name: string

  tokenAddress: string
  url = ''
  slug: string[] = []
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
    this._name = data.name
    this.ceramicId = data.ceramicId
    this.owners = data.owners
    this.parentAddress = EMPTY_CONTRACT_ADDRESS === data.parent ? undefined : data.parent
    this.token = new Erc20Store({
      root: this.root,
      tokenAddress: ethers.utils.getAddress(data.token),
      storeKey: `${data.name}token`,
      // symbolOverride: 'ETH',
    })
    this.tokenAddress = data.token

    makeObservable(this, {
      name: computed,
      nameAsSlug: computed,
      topLevel: computed,
      allocation: computed,
      children: computed,
      parent: computed,
      level: computed,
      allChildren: computed,
      color: observable,
      tasks: observable,
      data: observable,
      setColor: action,
    })

    this.init()
  }

  get name(): string {
    return this.data?.name || this._name
  }

  get nameAsSlug(): string {
    return slugify(this.name)
  }

  get level(): number {
    let parent = this?.parent
    let _level = 1

    while (parent) {
      if (parent) {
        _level += 1
        parent = parent.parent
      }
    }

    return _level
  }

  fetchBucketEvents = async (bucketAddress: string): Promise<TaskCreatedEvent[]> => {
    const bucketContract = Bucket__factory.connect(bucketAddress, this.root.web3Store.coreProvider)

    const result = await bucketContract.queryFilter(
      bucketContract.filters.TaskCreated(null, null, null, null, null),
      0,
      'latest'
    )

    return (result || []) as TaskCreatedEvent
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

  get parent(): BucketEntity | void {
    return this.root.bucketStore.buckets.find((bucket) => bucket.id === this.parentAddress)
  }

  get children(): BucketEntity[] {
    return this.root.bucketStore.buckets.filter((bucket) => bucket.parent?.id === this.id)
  }

  get allChildren(): BucketEntity[] {
    const children: BucketEntity[] = []

    const mapChild = (child: BucketEntity) => {
      children.push(child)
      child.children.forEach(mapChild)
    }
    this.children.forEach(mapChild)

    return children
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
    this.setColor()
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

  getTreeUp = (): BucketEntity[] => {
    const items = []
    let parent = this?.parent

    while (parent) {
      if (parent) {
        items.unshift(parent)
        parent = parent.parent
      }
    }

    items.push(this)

    return items
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

  getSymbol = (): string => {
    const symbol = this.token.symbol() || ''
    return typeof symbol === 'string' ? symbol : symbol[0]
  }

  init = async (): Promise<void> => {
    const result = await this.fetchBucketEvents(this.id)
    const bucketTasks = result.map((event) => {
      // console.log(`Bucket Event ${this.name}`, { event, ceramicId: event.args.data })
      return new TaskEntity(this.root, {
        data: {
          id: event.args.id,
          ceramicId: event.args.data,
          // deadline: event.args.deadline,
          // issuers: event.args.issuers,
          // approvers: event.args.approvers,
        },
      })
    })
    console.log({ bucketTasks })

    runInAction(() => {
      this.tasks = bucketTasks
    })

    this.getAllocation()

    autorun(() => {
      this.setStructure()
    })
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
        const tx = await erc20Contract.approve(ethers.utils.getAddress(this.id), INFINITE)
        await tx.wait()
      }

      const contract = Bucket__factory.connect(
        ethers.utils.getAddress(this.id),
        this.root.web3Store.signer
      )

      const tx2 = await contract.fundBucket(amount)
      await tx2.wait()
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
