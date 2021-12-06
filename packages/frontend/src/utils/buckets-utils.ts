import { BucketEntity } from '../stores/entities/Bucket.entity'

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const buildBucketEntityStructure = (buckets: BucketEntity[]): BucketEntity[] => {
  const topBuckets = buckets.filter((bucket) => !bucket.parentAddress)

  const mapChildBucket = (parent: BucketEntity, level: number): void => {
    buckets
      .filter((bucket) => parent.id === bucket.parentAddress)
      .forEach((bucket) => {
        bucket.setLevel(level)
        bucket.setParent(parent)
        parent.addChild(bucket)
        mapChildBucket(bucket, level + 1)
      })
  }

  topBuckets.forEach((bucket) => {
    bucket.setLevel(1)
    mapChildBucket(bucket, 2)
  })

  buckets.forEach((bucket) => bucket.setStructure())

  return buckets
}
