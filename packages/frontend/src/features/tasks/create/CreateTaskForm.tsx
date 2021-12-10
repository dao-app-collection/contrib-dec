import * as React from 'react'
import { FC } from 'react'
import { TaskMetaData } from '../../../types/all-types'
import TaskForm from '../TaskForm'

type Props = {
  onSubmit: (payload: Partial<TaskMetaData>) => void
}

const CreateTaskForm: FC<Props> = ({ onSubmit }) => {
  return <TaskForm onSubmit={onSubmit} />
}

export default CreateTaskForm
