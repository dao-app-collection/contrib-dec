import { Loading, Modal } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import CreateTaskForm from './CreateTaskForm'
import { BucketEntity } from '../../../stores/entities/Bucket.entity'
import useCreateTask from '../../../hooks/useCreateTask'
import { TaskPayload } from '../../../types/all-types'

type Props = {
  visible: boolean
  onClose: () => void
  selectedBucket?: BucketEntity
}

const CreateTaskModal: FC<Props> = ({ onClose, visible, selectedBucket }) => {
  const { createTask, isCreating } = useCreateTask({ selectedBucket })
  const onSubmit = async (payload: TaskPayload) => {
    const success = await createTask(payload)
    if (success) {
      onClose()
    }
  }

  if (isCreating) {
    return <Loading />
  }

  return (
    <>
      <Modal visible={visible} onClose={onClose}>
        <Modal.Title>Create new task</Modal.Title>
        <Modal.Content>
          <CreateTaskForm onSubmit={onSubmit} />
        </Modal.Content>
      </Modal>
    </>
  )
}

export default observer(CreateTaskModal)
