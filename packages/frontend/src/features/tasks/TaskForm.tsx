import * as React from 'react'
import { Grid, Input, Textarea, Button, useInput } from '@geist-ui/react'
import { FC } from 'react'
import dayjs from 'dayjs'
import { TaskPayload } from '../../types/all-types'
import { useRootStore } from '../../context/RootStoreProvider'

type Props = {
  initialData: any
  onSubmit: (payload: TaskPayload) => void
  lockedFields: string[]
}

type FieldValues = { title: string; description: string }
const TaskForm: FC<Props> = ({ onSubmit, initialData, lockedFields }) => {
  const { uiStore } = useRootStore()
  const titleInput = useInput('')
  const descriptionInput = useInput('')

  const handleSubmit = async () => {
    if (titleInput.state && descriptionInput.state) {
      try {
        onSubmit({
          title: titleInput.state,
          description: descriptionInput.state,
          deadline: dayjs().add(10, 'day'),
          approvers: [],
          issuers: [],
        })
      } catch (e) {
        uiStore.errorToast('Error creating task', e)
      }
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <Grid.Container gap={2}>
        <Grid xs={24}>
          <Input clearable {...titleInput.bindings} width="100%" placeholder="Title" />
        </Grid>
        <Grid xs={24}>
          <Textarea {...descriptionInput.bindings} width="100%" placeholder="Description" />
        </Grid>

        {/* <span>{errors.name?.message}</span> */}
        <Grid xs={24}>
          <Button htmlType="submit" width="100%">
            Create task
          </Button>
        </Grid>
      </Grid.Container>
    </form>
  )
}

export default TaskForm
