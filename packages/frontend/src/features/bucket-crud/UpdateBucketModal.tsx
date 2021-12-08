import { Loading } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import BucketForm from './BucketForm'
import Modal from '../../components/Modal'
import useUpdateBucket from '../../hooks/useUpdateBucket'
import { BucketPayload } from '../../types/all-types'
import useSelectedBucket from '../../hooks/useSelectedBucket'

type Props = {
  visible: boolean
  onClose: () => void
}

const UpdateBucketModal: FC<Props> = ({ onClose, visible }) => {
  const selectedBucket = useSelectedBucket()
  const { updateBucket, isUpdating } = useUpdateBucket({ bucket: selectedBucket })
  const onSubmit = async (payload: BucketPayload) => {
    const success = await updateBucket(payload)

    if (success) {
      onClose()
    }
  }

  if (!selectedBucket) {
    return null
  }

  const defaultValues = {
    owners: selectedBucket?.owners,
    tokenAddress: selectedBucket?.tokenAddress,
    name: selectedBucket?.name,
    description: selectedBucket?.data?.description,
    discord: selectedBucket?.data?.discord,
    website: selectedBucket?.data?.website,
    logo: selectedBucket?.data?.logo,
    primaryColor: selectedBucket?.data?.primaryColor,
  }

  return (
    <Modal
      title={`Update bucket ${selectedBucket.name}`}
      loading={isUpdating}
      visible={visible}
      onClose={onClose}
    >
      <BucketForm onSubmit={onSubmit} edit defaultValues={defaultValues} />
    </Modal>
  )
}

export default observer(UpdateBucketModal)
