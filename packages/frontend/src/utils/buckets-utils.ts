import { BucketEntity } from '../stores/entities/Bucket.entity'
import { RootStore } from '../stores/RootStore'
import { TheGraphBucket } from '../types/all-types'

export const getBucketSlug = (
  bucket: TheGraphBucket,
  allBuckets: TheGraphBucket[],
  base: string[] = []
): string[] => {
  const url = [bucket.name, ...base]

  const parentBucket = allBuckets.find((parent) => parent.id === bucket.parent)

  if (parentBucket) {
    return getBucketSlug(parentBucket, allBuckets, url)
  }

  return url
}

export const getBucketUrl = (bucket: TheGraphBucket, allBuckets: TheGraphBucket[]): string =>
  `/${getBucketSlug(bucket, allBuckets).join('/')}`

export const getBucketLevel = (bucket: TheGraphBucket, allBuckets: TheGraphBucket[]): number => {
  const slugs = getBucketSlug(bucket, allBuckets)
  const index = slugs.findIndex((slug) => slug === bucket.name)

  return index >= 0 ? index + 1 : 0
}

export const buildBucketStructure = (
  name: string,
  allBuckets: TheGraphBucket[],
  root: RootStore
): BucketEntity[] => {
  const normalizedName = name.toLowerCase()
  const topBucket = allBuckets.find((bucket) => bucket.name.toLowerCase() === normalizedName)

  if (!topBucket) {
    throw new Error('Cant find top bucket')
  }

  const topBucketEntity = new BucketEntity(root, {
    bucket: topBucket,
    level: 1,
  })

  const tree = [topBucketEntity]

  const getChildBuckets = (parent: BucketEntity, level: number): void => {
    allBuckets
      .filter((bucket) => parent.id === bucket.parent)
      .forEach((bucket) => {
        const entity = new BucketEntity(root, {
          bucket,
          level,
          parent,
        })
        tree.push(entity)
        getChildBuckets(entity, level + 1)
      })
  }

  getChildBuckets(topBucketEntity, 2)

  tree.forEach((entity) => {
    const children = tree.filter((bucket) => bucket.parent?.id === entity.id)
    entity.setChildren(children)
  })

  return tree
}
