import { Modal } from '@geist-ui/react'
import * as React from 'react'
import { FC, useState } from 'react'
import CreateTaskForm from './CreateTaskForm'
import Button from '../../../components/Button'

const CreateTaskButton: FC = () => {
  const canCreateTask = true
  const [visible, setVisible] = useState(false)
  const onClose = () => setVisible(false)

  if (!canCreateTask) {
    return null
  }

  return (
    <>
      <Modal visible={visible} onClose={onClose}>
        <Modal.Title>Create new bucket</Modal.Title>
        <CreateTaskForm />
        <Modal.Action passive onClick={onClose}>
          Cancel
        </Modal.Action>
        {/* <Modal.Action onClick={onClose}>Create</Modal.Action> */}
      </Modal>
    </>
  )
}

export default CreateTaskButton
