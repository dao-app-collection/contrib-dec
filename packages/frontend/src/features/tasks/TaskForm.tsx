import * as React from 'react'
import { Grid, Button, Spacer, Divider } from '@geist-ui/react'
import { FC } from 'react'
import dayjs from 'dayjs'
import { FormProvider, useForm } from 'react-hook-form'
import { MyField, TaskPayload } from '../../types/all-types'
import { useRootStore } from '../../context/RootStoreProvider'
import FormField from '../../components/form/FormField'

type FormData = {
  title: string
  description: string
  deadline: string
  issuers: string[]
  approvers: string[]
}

type Props = {
  onSubmit: (payload: TaskPayload) => void
  edit?: boolean
  defaultValues?: Partial<FormData>
}

const TaskForm: FC<Props> = ({ onSubmit, defaultValues, edit = false }) => {
  const { uiStore } = useRootStore()

  const fields: MyField[] = [
    {
      name: 'title',
      label: 'Name',
      required: true,
      disabled: edit,
    },
    {
      name: 'description',
      label: 'Description',
      required: true,
      type: 'textarea',
    },
  ]

  const methods = useForm<FormData>({
    defaultValues: {
      ...defaultValues,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const _onSubmit = handleSubmit((data) => {
    try {
      onSubmit({
        title: data.title,
        description: data.description,
        deadline: dayjs().add(10, 'day'),
        approvers: [],
        issuers: [],
      })
    } catch (e) {
      uiStore.errorToast('Error creating task', e)
    }
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={_onSubmit}>
        <Grid.Container gap={2}>
          {fields.map((field) => (
            <Grid xs={24} key={field.name}>
              <FormField {...field} register={register} />
            </Grid>
          ))}
        </Grid.Container>
        <Spacer h={2} />
        <Divider />
        <Button htmlType="submit">{edit ? 'Update task' : 'Create task'}</Button>
      </form>
    </FormProvider>
  )
}

export default TaskForm
