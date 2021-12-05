import * as React from 'react'
import { useForm } from 'react-hook-form'
import { FC } from 'react'
import { Input, Textarea, Button } from '@geist-ui/react'
import dayjs from 'dayjs'
import { TaskPayload } from '../../types/all-types'

type Props = {
  initialData: any
  onSubmit: (payload: TaskPayload) => void
  lockedFields: string[]
}

type FieldValues = { title: string; description: string }
const TaskForm: FC<Props> = ({ onSubmit, initialData, lockedFields }) => {
  const { register, handleSubmit, reset, formState } = useForm<FieldValues>()
  const { isDirty, isSubmitting, errors } = formState

  const _onSubmit = (data: FieldValues) => {
    onSubmit({
      title: data.title,
      description: data.description,
      deadline: dayjs().add(10, 'day'),
      approvers: [],
      issuers: [],
    })
  }

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <Input {...register('title', { required: true })} placeholder="Title" />
      <Textarea {...register('description', { required: true })} placeholder="Description" />

      {/* <span>{errors.name?.message}</span> */}

      <Button htmlType="submit">submit</Button>
    </form>
  )
}

export default TaskForm
