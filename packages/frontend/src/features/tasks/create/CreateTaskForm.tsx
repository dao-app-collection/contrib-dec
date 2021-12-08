import * as React from 'react'
import { FC } from 'react'
import { TaskPayload } from '../../../types/all-types'
import TaskForm from '../TaskForm'

type Props = {
  onSubmit: (payload: TaskPayload) => void
}

const CreateTaskForm: FC<Props> = ({ onSubmit }) => {
  return <TaskForm onSubmit={onSubmit} />
}

export default CreateTaskForm
