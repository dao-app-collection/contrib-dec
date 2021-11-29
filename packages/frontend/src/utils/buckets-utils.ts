import { TheGraphBucket } from '../types/all-types'

export const mockBuckets: TheGraphBucket[] = [
  {
    name: 'dxdao',
    id: '123',
  },
  {
    name: 'frontend',
    id: '456',
    parent: '123',
  },
  {
    name: 'website',
    id: '999',
    parent: '456',
  },
  {
    name: 'orakuru',
    id: '8589',
  },
]

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
