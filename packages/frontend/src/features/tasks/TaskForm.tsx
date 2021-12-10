import * as React from 'react'
import { Grid, Button, Spacer, Divider } from '@geist-ui/react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { MyField, TaskMetaData } from '../../types/all-types'
import { useRootStore } from '../../context/RootStoreProvider'
import FormField from '../../components/form/FormField'
import { spacingIncrement } from '../../theme/utils'

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
  loading?: boolean
}

const Form = styled.form`
  padding: ${spacingIncrement(30)};
`

const TaskForm: FC<Props> = ({ onSubmit, defaultValues, edit = false, loading }) => {
  const { uiStore } = useRootStore()

  const fields: MyField[] = [
    {
      name: 'title',
      label: 'Title',
      required: true,
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

  const bodyField = {
    name: 'body',
    label: 'Description',
    required: true,
    type: 'body',
  }

  const methods = useForm<FormData>({
    defaultValues: {
      ...defaultValues,
      body: defaultValues?.body || '',
      experienceLevel: defaultValues?.experienceLevel && {
        value: defaultValues.experienceLevel,
        label: defaultValues.experienceLevel.toLowerCase(),
      },
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
      onSubmit({
        ...data,
        deadline: data.deadline ? data.deadline.getTime() : 0,
        experienceLevel: data.experienceLevel?.value || '',
      })
    } catch (e) {
      uiStore.errorToast('Error creating task', e)
    }
  })

  return (
    <FormProvider {...methods}>
      <Form onSubmit={_onSubmit}>
        <Grid.Container gap={4}>
          {fields.map((field) => (
            <Grid xs={24} md={12} key={field.name}>
              <FormField {...field} register={register} />
            </Grid>
          ))}
        </Grid.Container>{' '}
        <Spacer h={2} />
        <FormField {...bodyField} />
        <Spacer h={2} />
        <Divider /> <Spacer h={2} />
        <Button loading={loading} htmlType="submit">
          {edit ? 'Update task' : 'Create task'}
        </Button>
      </Form>
    </FormProvider>
  )
}

export default TaskForm
