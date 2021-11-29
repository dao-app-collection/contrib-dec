import * as React from 'react'
import { FC } from 'react'
import { PopulatedBucket } from '../../types/all-types'

type Props = {
  buckets: PopulatedBucket[]
}

const BucketCanvas: FC<Props> = ({ buckets }) => {
  return (
    <div>
      {buckets.map((bucket) => (
        <div key={bucket.id}>
          <div>{bucket.name}</div>

          <div>url: {bucket.url}</div>
          <div>level: {bucket.level}</div>
        </div>
      ))}
    </div>
  )
}

export default BucketCanvas
