import { makeObservable, observable, runInAction } from 'mobx'
import { ethers } from 'ethers'
import Router from 'next/router'
import { RootStore } from './RootStore'
import { ContractStore } from './ContractStore'
import {
  Bucket__factory,
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
    }
  }

  async createBucket(...params: Parameters<CreateBucket>): Promise<boolean> {
    try {
      runInAction(() => {
        this.creatingBucket = true
      })
      console.log(1)
      const tx = await this.sendTransaction<CreateBucket>('createBucket', params)
      console.log(2, tx)
      const tx2 = await tx.wait()
      console.log(3, tx2)
      await this.root.bucketStore.fetchBuckets()
      console.log(4)
      const newBucket = this.root.bucketStore.buckets[this.root.bucketStore.buckets.length - 1]
      console.log(newBucket, this.root.bucketStore.buckets[0])
      this.root.uiStore.successToast(`Bucket created!`)
      Router.push(newBucket.url)
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
}
