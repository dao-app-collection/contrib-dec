import { getBucketSlug, mockBuckets } from '../buckets-utils'

describe('bucket-utils tests', () => {
  test('getBucketSlug', () => {
    const urls = mockBuckets.map((mockBucket) => getBucketSlug(mockBucket, mockBuckets))

    expect(urls).toEqual(['/dxdao', '/dxdao/frontend', '/dxdao/frontend/website', '/orakuru'])
  })
})
