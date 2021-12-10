import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import { BucketEntity } from '../../stores/entities/Bucket.entity'

type Props = { bucket: BucketEntity }

const BucketMembers: FC<Props> = ({ bucket }) => {
  return null
}

export default observer(BucketMembers)
