import * as React from 'react'
import { FC } from 'react'
import { TaskPayload } from '../../../types/all-types'
import TaskForm from '../TaskForm'
import ceramic, { CeramicSchema } from '../../../utils/services/ceramic'

type Props = {
  onSubmit: (payload: TaskPayload) => void
}

const CreateTaskForm: FC<Props> = (props) => {
  const onCreate = async (payload: TaskPayload) => {
    try {
      const ceramicId = await ceramic.create({
        schema: CeramicSchema.TASK_META_DATA,
        data: {
          title: payload.title,
          description: payload.description,
        },
      })
      console.log(ceramicId)
    } catch (e) {
      console.error(e)
    }
  }

  return <TaskForm onSubmit={onCreate} lockedFields={[]} initialData={{}} />
}

export default CreateTaskForm
