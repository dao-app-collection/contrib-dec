import { Loading } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import BucketForm from './BucketForm'
import Modal from '../../components/Modal'
import { BucketEntity } from '../../stores/entities/Bucket.entity'
import useCreateBucket from '../../hooks/useCreateBucket'
import { BucketPayload } from '../../types/all-types'

type Props = {
  visible: boolean
  onClose: () => void
  selectedBucket?: BucketEntity
}

const CreateBucketModal: FC<Props> = ({ onClose, visible, selectedBucket }) => {
  const { createBucket, creating } = useCreateBucket({ parentBucket: selectedBucket })
  const onSubmit = async (payload: BucketPayload) => {
    const success = await createBucket(payload)

    if (success) {
      onClose()
    }
  }

  const defaultValues = {
    owners: selectedBucket?.owners,
    tokenAddress: selectedBucket?.tokenAddress,
    discord: selectedBucket?.data?.discord,
    website: selectedBucket?.data?.website,
    // logo: selectedBucket?.data?.logo,
    colorPrimary: selectedBucket?.data?.primaryColor,
  }

  return (
    <Modal
      title="Create new bucket"
      subText={
        selectedBucket ? `You will create a sub-bucket of ${selectedBucket.name}` : undefined
      }
      loading={creating}
      visible={visible}
      onClose={onClose}
    >
      <BucketForm onSubmit={onSubmit} defaultValues={defaultValues} />
    </Modal>
  )
}

export default observer(CreateBucketModal)
