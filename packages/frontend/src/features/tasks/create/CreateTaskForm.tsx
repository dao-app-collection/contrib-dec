import * as React from 'react'
import { FC } from 'react'
import useSelectedBucket from '../../../hooks/useSelectedBucket'
import { TaskMetaData } from '../../../types/all-types'
import TaskForm from '../TaskForm'

type Props = {
  onSubmit: (payload: Partial<TaskMetaData>) => void
}

const CreateTaskForm: FC<Props> = ({ onSubmit }) => {
  const selectedBucket = useSelectedBucket()

  return <TaskForm symbol={selectedBucket?.getSymbol()} onSubmit={onSubmit} />
}

export default CreateTaskForm
