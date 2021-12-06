import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import CreateBucketButton from './CreateBucketButton'
import useSelectedBucket from '../../hooks/useSelectedBucket'

const CreateSubBucketButton: React.FC = () => {
  const selectedBucket = useSelectedBucket()

  return <CreateBucketButton selectedBucket={selectedBucket} />
}

export default observer(CreateSubBucketButton)
