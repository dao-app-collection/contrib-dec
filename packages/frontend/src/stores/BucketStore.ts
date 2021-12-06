import { action, makeAutoObservable, observable, runInAction } from 'mobx'
import { RootStore } from './RootStore'
import { BucketEntity } from './entities/Bucket.entity'
import ceramic from '../utils/services/ceramic'
import { notEmpty } from '../utils/array-utils'
import { buildBucketEntityStructure } from '../utils/buckets-utils'

export class BucketStore {
  root: RootStore
  buckets: BucketEntity[] = []
  loading = true

  constructor(root: RootStore) {
    this.root = root

    if (typeof window !== 'undefined') {
      this.init()
    }

    makeAutoObservable(this, {
      buckets: observable,
      loading: observable,
      init: action,
    })
  }

  init = async (): Promise<void> => {
    try {
      await ceramic.authenticate()
      const events = await this.root.contribBucketFactoryContractStore.getEvents()

      const result: any[] = await Promise.all(
        events.map(async (event) => {
          if (!event.args) {
            return null
          }
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

      const entities = result.filter(notEmpty).map(
        (bucket) =>
          new BucketEntity(this.root, {
            data: bucket,
          })
      )

      const buckets = buildBucketEntityStructure(entities)
      runInAction(() => {
        this.buckets = buckets
        this.loading = false
      })
    } catch (e) {
      console.error(e)
    }
    runInAction(() => {
      this.loading = false
    })
  }
}
