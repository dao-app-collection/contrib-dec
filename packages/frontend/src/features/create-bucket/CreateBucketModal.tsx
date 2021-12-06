import { Loading, Modal } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import BucketForm from './BucketForm'
import { BucketEntity } from '../../stores/entities/Bucket.entity'
import useCreateBucket from '../../hooks/useCreateBucket'

type Props = {
  visible: boolean
  onClose: () => void
  selectedBucket?: BucketEntity
}

const CreateBucketModal: FC<Props> = ({ onClose, visible, selectedBucket }) => {
  const { createBucket, creating } = useCreateBucket({ parentBucket: selectedBucket })

  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Title>Create new bucket</Modal.Title>
      {selectedBucket && (
        <Modal.Subtitle>You will create a sub-bucket of {selectedBucket.name}</Modal.Subtitle>
      )}
      {creating ? <Loading /> : <BucketForm onClose={onClose} onSubmit={createBucket} />}
    </Modal>
  )
}

export default observer(CreateBucketModal)
