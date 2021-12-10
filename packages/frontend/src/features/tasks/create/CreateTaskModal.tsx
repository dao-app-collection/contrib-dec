import { Loading } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import CreateTaskForm from './CreateTaskForm'
import { BucketEntity } from '../../../stores/entities/Bucket.entity'
import useCreateTask from '../../../hooks/useCreateTask'
import {
  ExperienceLevel,
  TaskMetaData,
  TaskPayload,
  TaskStatus,
  TaskType,
} from '../../../types/all-types'
import Modal from '../../../components/Modal'

type Props = {
  visible: boolean
  onClose: () => void
  selectedBucket?: BucketEntity
}

const CreateTaskModal: FC<Props> = ({ onClose, visible, selectedBucket }) => {
  const { createTask, isCreating } = useCreateTask({ selectedBucket })
  const onSubmit = async (payload: Partial<TaskMetaData>) => {
    const meta: TaskMetaData = {
      title: payload.title || 'kek',
      body: payload.title || '',
      deadlineTimestamp: payload.deadline || 0,
      experienceLevel: payload.experienceLevel || ('' as ExperienceLevel),
      github: payload.github || '',
      timeCommitment: payload.timeCommitment || '',
      assignes: [],
      applications: [],
      taskStatus: TaskStatus.OPEN,
      createdTimestamp: Date.now(),
      claimedTimestamp: 0,
      taskType: TaskType.BOUNTY,
      requirements: [],
    }

    const success = await createTask({
      data: meta,
      deadline: meta.deadlineTimestamp,
      issuers: selectedBucket?.owners || [],
      approvers: selectedBucket?.owners || [],
    })

    return
    if (success) {
      onClose()
    }
  }

  if (isCreating) {
    return <Loading />
  }

  return (
    <>
      <Modal title="Create new task" visible={visible} onClose={onClose}>
        <CreateTaskForm onSubmit={onSubmit} />
      </Modal>
    </>
  )
}

export default observer(CreateTaskModal)
