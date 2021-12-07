import { Modal } from '@geist-ui/react'
import * as React from 'react'
import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import CreateTaskForm from './CreateTaskForm'
import Button from '../../../components/Button'
import { useDao } from '../../../context/DaoContext'
import { useRootStore } from '../../../context/RootStoreProvider'

const CreateTaskButton: FC = () => {
  const { selectedBucket } = useDao()
  const [visible, setVisible] = useState(false)
  const { web3Store } = useRootStore()
  const onClose = () => setVisible(false)
  const label = web3Store.signerState.address ? 'Create Bucket' : 'Connect Wallet to create Bucket'

  if (!selectedBucket?.signerIsOwner) {
    return null
  }

  const onClick = () => {
    setVisible(true)
  }

  return (
    <>
      <Button
        onClick={onClick}
        width="100%"
        modifier="dao"
        // loading={contribBucketFactoryContractStore.creatingBucket}
      >
        {label}
      </Button>
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

export default observer(CreateTaskButton)
