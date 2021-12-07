import { Loading, Modal } from '@geist-ui/react'
import * as React from 'react'
import { FC, useState } from 'react'
import styled from 'styled-components'
import useSelectedBucket from '../../hooks/useSelectedBucket'
import useUpdateBucket from '../../hooks/useUpdateBucket'
import BucketForm from '../create-bucket/BucketForm'

const Container = styled.div`
  margin-left: auto;
  min-height: 20px;
  min-width: 20px;

  div {
    cursor: pointer;
  }
`

const BucketEditAction: FC = () => {
  const [visible, setVisible] = useState(false)
  const onClose = () => setVisible(false)
  const selectedBucket = useSelectedBucket()
  const { updateBucket, isUpdating } = useUpdateBucket({ bucket: selectedBucket })

  const onSubmit = async (data) => {
    onClose()

    await updateBucket({
      title: data.name,
      description: data.description,
    })
  }

  const data = selectedBucket?.data || {}

  const defaultValues = {
    name: selectedBucket?.name,
    colorAccent: data?.accent,
    colorInverted: data?.inverted,
    colorPrimary: data?.primary,
    description: data.description,
  }

  return (
    <>
      <Container>
        {isUpdating ? <Loading /> : <div onClick={() => setVisible(true)}>Edit</div>}
      </Container>

      <Modal visible={visible} onClose={onClose}>
        <Modal.Title>Edit bucket</Modal.Title>

        <BucketForm defaultValues={defaultValues} edit onSubmit={onSubmit} />
      </Modal>
    </>
  )
}

export default BucketEditAction
