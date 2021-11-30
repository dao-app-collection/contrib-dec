import { TheGraphBucket } from '../../types/all-types'
import { RootStore } from '../RootStore'

export class BucketEntity {
  root: RootStore
  loading = true
  id: string
  name: string
  level: number
  url: string
  slug: string[]
  parent?: BucketEntity
  children: BucketEntity[] = []

  constructor(
    root: RootStore,
    { bucket, level, parent }: { bucket: TheGraphBucket; level: number; parent?: BucketEntity }
  ) {
    this.root = root
    this.id = bucket.id
    this.name = bucket.name
    this.level = level
    this.url = parent ? `${parent.url}/${bucket.name}` : `/${bucket.name}`
    this.slug = parent ? [...parent.slug, bucket.name] : [bucket.name]
    this.parent = parent
  }

  setChildren = (children: BucketEntity[]): void => {
    this.children = children
  }
}
