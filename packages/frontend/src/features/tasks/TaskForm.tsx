import * as React from 'react'
import { Grid, Button, Spacer, Divider } from '@geist-ui/react'
import { FC } from 'react'
import dayjs from 'dayjs'
import { FormProvider, useForm } from 'react-hook-form'
import { MyField, TaskMetaData } from '../../types/all-types'
import { useRootStore } from '../../context/RootStoreProvider'
import FormField from '../../components/form/FormField'

type FormData = {
  title: string
  body: string
  experienceLevel?: string
  github?: string
  timeCommitment: string
  deadline?: Date
}

type Props = {
  onSubmit: (payload: Partial<FormData>) => void
  edit?: boolean
  defaultValues?: Partial<TaskMetaData>
}

const TaskForm: FC<Props> = ({ onSubmit, defaultValues, edit = false }) => {
  const { uiStore } = useRootStore()

  const fields: MyField[] = [
    {
      name: 'title',
      label: 'Title',
      required: true,
      disabled: edit,
    },
    {
      name: 'body',
      label: 'Description',
      required: true,
      type: 'body',
    },
    {
      name: 'github',
      label: 'Github link',
    },
    {
      name: 'deadline',
      label: 'Deadline',
      type: 'date',
    },
    {
      name: 'experienceLevel',
      label: 'Experience Level',
      required: true,
      type: 'select',
      options: [
        {
          value: 'beginner',
          label: 'Beginner',
        },
        {
          value: 'intermediate',
          label: 'Intermediate',
        },
        {
          value: 'senior',
          label: 'Senior',
        },
      ],
    },
  ]

  const methods = useForm<FormData>({
    defaultValues: {
      ...defaultValues,
      body: defaultValues?.body || '',
      deadline: defaultValues?.deadlineTimestamp
        ? new Date(defaultValues.deadlineTimestamp)
        : undefined,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const _onSubmit = handleSubmit((data) => {
    try {
      console.log('....data', data)
      onSubmit({
        ...data,
        deadline: data.deadline ? data.deadline.getTime() : 0,
        experienceLevel: data.experienceLevel?.value || '',
      })

      // onSubmit({
      //   title: data.title,
      //   body: data.body,
      //   deadline: dayjs().add(10, 'day'),
      //   approvers: [],
      //   issuers: [],
      // })
    } catch (e) {
      uiStore.errorToast('Error creating task', e)
    }
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={_onSubmit}>
        <Grid.Container gap={4}>
          {fields.map((field) => (
            <Grid xs={24} key={field.name}>
              <FormField {...field} register={register} />
            </Grid>
          ))}
        </Grid.Container>
        <Spacer h={2} />
        <Divider /> <Spacer h={2} />
        <Button htmlType="submit">{edit ? 'Update task' : 'Create task'}</Button>
      </form>
    </FormProvider>
  )
}

export default TaskForm
