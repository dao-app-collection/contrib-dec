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

    makeAutoObservable(this, {
      buckets: observable,
      loading: observable,
      init: action,
    })
  }

  init = async (): Promise<void> => {
    try {
      await ceramic.authenticate()
      this.fetchBuckets()
    } catch (e) {
      console.error(e)
    }
  }

  fetchBuckets = async (): Promise<void> => {
    try {
      const events = await this.root.contribBucketFactoryContractStore.getEvents()

      const blackListed = ['0xd9Af3a4773A650c9686C9643920B469B937F4690']
      const result = events
        .filter((event) => !blackListed.includes(event.args?.bucket))
        // .filter((event) => event.args)
        .map(
          (event) =>
            new BucketEntity(this.root, {
              data: {
                owners: event.args.owners,
                id: event.args.bucket,
                name: event.args.name,
                token: event.args.token,
                parent: event.args.parent,
                ceramicId: event.args.data,
              },
            })
        )

      const entities = result.filter(notEmpty)

      await Promise.all(entities.map((entity) => entity.load()))

      const buckets = entities // buildBucketEntityStructure(entities)
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
