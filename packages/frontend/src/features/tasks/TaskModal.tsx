import { Modal } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import { TaskEntity } from '../../stores/entities/Task.entity'

type Props = {
  //   visible: boolean
  onClose: () => void
  task: TaskEntity | null
}

const TaskModal: FC<Props> = ({ onClose, task }) => {
  const visible = Boolean(task)

  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Title>{task?.id}</Modal.Title>
      <Modal.Subtitle>This is a modal</Modal.Subtitle>
      <Modal.Content>
        <p>Some content contained within the modal.</p>
      </Modal.Content>
      <Modal.Action passive onClick={onClose}>
        Cancel
      </Modal.Action>
      <Modal.Action disabled>Submit</Modal.Action>
    </Modal>
  )
}

export default observer(TaskModal)
