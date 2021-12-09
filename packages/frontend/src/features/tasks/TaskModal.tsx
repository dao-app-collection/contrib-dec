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
      <Modal.Title>{task?.data?.title}</Modal.Title>
      {task?.id && <Modal.Subtitle>id: {task?.id}</Modal.Subtitle>}
      <Modal.Content>
        <p>{task?.data?.description}</p>
      </Modal.Content>
      <Modal.Action passive onClick={onClose}>
        Cancel
      </Modal.Action>
      <Modal.Action disabled>Submit</Modal.Action>
    </Modal>
  )
}

export default observer(TaskModal)
