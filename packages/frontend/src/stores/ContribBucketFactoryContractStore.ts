import { makeObservable, observable, runInAction } from 'mobx'
import { ethers } from 'ethers'
import { RootStore } from './RootStore'
import { ContractStore } from './ContractStore'
import {
  ContribBucketFactoryAbi as ContribBucket,
  ContribBucketFactoryAbi__factory,
} from '../generated'

type CreateBucket = ContribBucket['functions']['createBucket']
type FundBucket = ContribBucket['functions']['fundBucket']

export class ContribBucketFactoryContractStore extends ContractStore {
  creatingBucket = false

  constructor(root: RootStore) {
    super(
      root,
      'CONTRIB_BUCKET_FACTORY',
      'contribBucketFactoryContractStore',
      ContribBucketFactoryAbi__factory
    )
    makeObservable(this, {
      creatingBucket: observable,
      createBucket: observable,
    })

    if (typeof window !== 'undefined') {
      this.getEvents()
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

  getEvents = async (): Promise<ethers.Event[]> => {
    const result = await this.contract?.queryFilter(
      this.contract.filters.BucketCreated(null, null, null, null, null, null),
      0,
      'latest'
    )

    return result || []
  }
}
