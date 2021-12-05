import { AutoComplete, Grid, Input, Modal, Select, useInput } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC, useState } from 'react'
import BucketForm from './BucketForm'
import { BucketEntity } from '../../stores/entities/Bucket.entity'
import { BucketPayload } from '../../types/all-types'

type Props = {
  visible: boolean
  onClose: () => void
  onCreate: (payload: BucketPayload) => void
  selectedBucket?: BucketEntity
}

const CreateBucketModal: FC<Props> = ({ onClose, visible, onCreate, selectedBucket }) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Title>Create new bucket</Modal.Title>
      {selectedBucket && (
        <Modal.Subtitle>You will create a sub-bucket of {selectedBucket.name}</Modal.Subtitle>
      )}

      <BucketForm onClose={onClose} onSubmit={onCreate} />
      <Modal.Action passive onClick={onClose}>
        Cancel
      </Modal.Action>
    </Modal>
  )
}

export default observer(CreateBucketModal)
