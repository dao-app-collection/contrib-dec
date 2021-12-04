import * as React from 'react'
import { FC } from 'react'
import Button from '../../components/Button'

const CreateTaskButton: FC = () => {
  const canCreateTask = true

  if (!canCreateTask) {
    return null
  }

  return (
    <Button width="100%" modifier="dao">
      Create task
    </Button>
  )
}

export default CreateTaskButton
