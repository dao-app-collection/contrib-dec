import { Modal } from '@geist-ui/react'
import * as React from 'react'
import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import CreateTaskForm from './CreateTaskForm'
import Button from '../../../components/Button'
import { useDao } from '../../../context/DaoContext'

const CreateTaskButton: FC = () => {
  const { selectedBucket } = useDao()
  const [visible, setVisible] = useState(false)
  const onClose = () => setVisible(false)

  if (!selectedBucket?.signerIsOwner) {
    return null
  }

  const onClick = () => {
    setVisible(true)
  }

  return (
    <>
      <Button onClick={onClick} width="100%" modifier="dao" loading={selectedBucket.creatingTask}>
        Create Task
      </Button>
      <Modal visible={visible} onClose={onClose}>
        <Modal.Title>Create new task</Modal.Title>
        <Modal.Content>
          <CreateTaskForm />
        </Modal.Content>
      </Modal>
    </>
  )
}

export default observer(CreateTaskButton)
