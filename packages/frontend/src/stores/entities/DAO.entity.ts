import { action, makeObservable, observable, runInAction } from 'mobx'
import { BucketEntity } from './Bucket.entity'
import { RootStore } from '../RootStore'
import { getAllBuckets } from '../../utils/services/bucket-api'
import { buildBucketStructure } from '../../utils/buckets-utils'

export class DAOEntity {
  root: RootStore
  loading = true
  buckets: BucketEntity[] = []

  constructor(root: RootStore) {
    this.root = root

    makeObservable(this, {
      buckets: observable,
      init: action,
    })
  }

  init = async (initialSlug: string[]): Promise<void> => {
    const allBuckets = await getAllBuckets()
    const topBucket = initialSlug[0]
    const buckets = buildBucketStructure(topBucket, allBuckets, this.root)

    runInAction(() => {
      this.buckets = buckets
    })
  }
}
