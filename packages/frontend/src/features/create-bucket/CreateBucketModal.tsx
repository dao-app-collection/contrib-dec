import { Loading, Modal } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import BucketForm from './BucketForm'
import { BucketEntity } from '../../stores/entities/Bucket.entity'
import useCreateBucket from '../../hooks/useCreateBucket'
import { BucketPayload } from '../../types/all-types'
import { useRootStore } from '../../context/RootStoreProvider'

type Props = {
  visible: boolean
  onClose: () => void
  selectedBucket?: BucketEntity
}

const CreateBucketModal: FC<Props> = ({ onClose, visible, selectedBucket }) => {
  const rootStore = useRootStore()

  const { createBucket, creating } = useCreateBucket({ parentBucket: selectedBucket })
  const onSubmit = async (payload: BucketPayload) => {
    const success = await createBucket(payload)
    console.log({ success, payload })
    if (success) {
      onClose()
    }
  }
  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Title>Create new bucket</Modal.Title>
      {selectedBucket && (
        <Modal.Subtitle>You will create a sub-bucket of {selectedBucket.name}</Modal.Subtitle>
      )}
      {creating ? (
        <Loading />
      ) : (
        <BucketForm
          defaultOwner={rootStore.web3Store.signerState.address}
          owners={selectedBucket?.owners.join(',')}
          tokenAddress={selectedBucket.token.address}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
    </Modal>
  )
}

export default observer(CreateBucketModal)
