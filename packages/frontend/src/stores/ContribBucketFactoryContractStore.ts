import { makeObservable, observable, runInAction } from 'mobx'
import { ethers } from 'ethers'
import { RootStore } from './RootStore'
import { ContractStore } from './ContractStore'
import {
  ContribBucketFactoryAbi as ContribBucket,
  ContribBucketFactoryAbi__factory,
  StandardBounties__factory,
} from '../generated'
import { BucketCreatedEvent } from '../generated/ContribBucketFactoryAbi'

type CreateBucket = ContribBucket['functions']['createBucket']

export class ContribBucketFactoryContractStore extends ContractStore {
  creatingBucket = false

  constructor(root: RootStore) {
    super({
      root,
      contractName: 'CONTRIB_BUCKET_FACTORY',
      storeKey: 'contribBucketFactoryContractStore',
      factory: ContribBucketFactoryAbi__factory,
    })
    makeObservable(this, {
      creatingBucket: observable,
      createBucket: observable,
    })

    if (typeof window !== 'undefined') {
      this.getEvents()
      this.getTaskEvents()
    }
  }

  async createBucket(...params: Parameters<CreateBucket>): Promise<boolean> {
    try {
      runInAction(() => {
        this.creatingBucket = true
      })
      const tx = await this.sendTransaction<CreateBucket>('createBucket', params)
      await tx.wait()
      await this.root.bucketStore.fetchBuckets()
      return true
    } catch (error) {
      this.root.uiStore.errorToast(`Error calling createBucket`, error)
      return false
    } finally {
      runInAction(() => {
        this.creatingBucket = false
      })
    }
  }

  async fundBucket(...params: Parameters<CreateBucket>): Promise<boolean> {
    try {
      runInAction(() => {
        this.creatingBucket = true
      })
      const tx = await this.sendTransaction<CreateBucket>('createBucket', params)
      await tx.wait()
      await this.root.bucketStore.fetchBuckets()
      return true
    } catch (error) {
      this.root.uiStore.errorToast(`Error calling createBucket`, error)
      return false
    } finally {
      runInAction(() => {
        this.creatingBucket = false
      })
    }
  }

  getEvents = async (): Promise<BucketCreatedEvent[]> => {
    const result = await this.contract?.queryFilter(
      this.contract.filters.BucketCreated(null, null, null, null, null, null),
      0,
      'latest'
    )

    return (result || []) as BucketCreatedEvent[]
  }

  getTaskEvents = async (): Promise<ethers.Event[]> => {
    const strandardContract = StandardBounties__factory.connect(
      '0x6ac6baf770b3ffe2ddb3c5797e47c17cebef2ec4',
      this.root.web3Store.coreProvider
    )

    const result = await strandardContract.queryFilter(
      strandardContract.filters.BountyIssued(null, null, null, null, null, null),
      0,
      'latest'
    )

    return result || []
  }
}
