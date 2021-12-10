import * as React from 'react'
import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { ethers } from 'ethers'
import TaskForm from './TaskForm'
import useUpdateTask from '../../hooks/useUpdateTask'
import { TaskEntity } from '../../stores/entities/Task.entity'
import { ExperienceLevel, TaskMetaData, TaskStatus, TaskType } from '../../types/all-types'

type Props = { task: TaskEntity }

const TaskEdit: FC<Props> = ({ task }) => {
  const { updateTask, isUpdating } = useUpdateTask({ task })

  if (!task.data) {
    return null
  }
  const onSubmit = async (payload: Partial<TaskMetaData>) => {
    if (isUpdating) {
      return null
    }

    const meta: TaskMetaData = {
      title: payload.title || 'kek',
      body: payload.body || '',
      deadlineTimestamp: payload.deadline || 0,
      experienceLevel: payload.experienceLevel || ('' as ExperienceLevel),
      github: payload.github || '',
      timeCommitment: payload.timeCommitment || '',
      assignes: task.data?.assignes || [],
      applications: task.data?.applications || [],
      taskStatus: task.data?.taskStatus || TaskStatus.OPEN,
      createdTimestamp: Date.now(),
      claimedTimestamp: 0,
      taskType: task.data?.taskType || TaskType.BOUNTY,
      requirements: task.data?.requirements || [],
    }

    updateTask(meta)
  }

  const defaultValues = {
    title: task.data.title,
    body: task.data.body,
    github: task.data.github,
    deadline: task.data.deadlineTimestamp,
    experienceLevel: task.data.experienceLevel,
    amount: task.balance && ethers.utils.formatEther(task.balance),
  }

  return (
    <TaskForm
      edit
      symbol={task.bucket?.getSymbol()}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      loading={isUpdating}
    />
  )
}

export default observer(TaskEdit)
