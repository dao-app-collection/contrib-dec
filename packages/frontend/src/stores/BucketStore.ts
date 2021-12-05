import { makeAutoObservable, observable, runInAction } from 'mobx'
import { RootStore } from './RootStore'
import { BucketEntity } from './entities/Bucket.entity'
import { BBucketEntity } from './entities/BBucket.entity'
import ceramic from '../utils/services/ceramic'
import { TheGraphBucket } from '../types/all-types'

export class BucketStore {
  root: RootStore
  buckets: BucketEntity[]
  constructor(root: RootStore) {
    this.root = root

    if (typeof window !== 'undefined') {
      this.init()
    }

    makeAutoObservable({
      buckets: observable,
    })
  }

  init = async () => {
    await ceramic.authenticate()

    const events = await this.root.contribBucketFactoryContractStore.getEvents()

    const result: TheGraphBucket[] = await Promise.all(
      events.map(async (event) => {
        const data = await ceramic.read(event.args.data)
        return {
          owners: event.args.owners,
          id: event.args.bucket,
          name: event.args.name,
          token: event.args.token,
          parent: event.args.parent,
          data,
        }
      })
    )

    runInAction(() => {
      this.buckets = result.map(
        (bucket) =>
          new BBucketEntity(this.root, {
            data: bucket,
          })
      )
    })
  }
}
