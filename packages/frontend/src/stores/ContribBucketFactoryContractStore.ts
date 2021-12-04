import { makeObservable, observable, runInAction } from 'mobx'
import { RootStore } from './RootStore'
import { ContractStore } from './ContractStore'
import {
  ContribBucketFactoryAbi as ContribBucket,
  ContribBucketFactoryAbi__factory,
} from '../generated'

type CreateBucket = ContribBucket['functions']['createBucket']

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
  }

  async createBucket(...params: Parameters<CreateBucket>): Promise<boolean> {
    try {
      runInAction(() => {
        this.creatingBucket = true
      })
      await this.sendTransaction<CreateBucket>('createBucket', params)
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
}
