import { Input, Modal, Textarea, Spacer, Divider, Grid } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ethers } from 'ethers'
import { BucketPayload, Field, FormFieldType } from '../../types/all-types'
import Button from '../../components/Button'
import FormField from '../../components/form/FormField'
import { OWNERS } from '../../lib/constants'

type FormData = {
  name: string
  description: string
  tokenAddress: string
  owners: string[]
  discord?: string
  website?: string
  logo?: string
  primaryColor?: string
}

type Props = {
  onSubmit: (payload: BucketPayload) => void
  edit?: boolean
  defaultValues: Partial<FormData>
}

const WEENUS_RINKENY_ADDRESS = '0xaFF4481D10270F50f203E0763e2597776068CBc5'

const BucketForm: FC<Props> = ({ onSubmit, defaultValues, edit = false }) => {
  const methods = useForm<FormData>({
    defaultValues: {
      ...defaultValues,
      owners: defaultValues.owners || OWNERS,
      tokenAddress: defaultValues.tokenAddress || WEENUS_RINKENY_ADDRESS,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods
  const _onSubmit = handleSubmit((data) => {
    const ownersCorrect = data.owners
      .map((add) => {
        try {
          return ethers.utils.getAddress(add)
        } catch (e) {
          //
        }
        return null
      })
      .filter(Boolean)

    try {
      onSubmit({
        ...data,
        primaryColor: data.primaryColor || '',
        discord: data.discord || '',
        website: data.website || '',
        logo: data.logo || '',
        owners: ownersCorrect as string[],
        tokenAddress: ethers.utils.getAddress(data.tokenAddress),
      })
    } catch (e) {
      console.error(e)
    }
  })

  type MyField = Omit<Field, 'register'> & {
    type?: FormFieldType
  }

  const fields: MyField[] = [
    {
      name: 'name',
      label: 'Name',
      required: true,
      disabled: edit,
    },
    {
      name: 'tokenAddress',
      label: 'Token Address',
      required: true,
      disabled: edit,
    },

    {
      name: 'owners',
      label: 'Owners',
      required: true,
      type: 'multiselect',
      disabled: edit,
    },

    {
      name: 'description',
      label: 'Description',
      required: true,
      type: 'textarea',
    },
  ]

  const secondaryFields: MyField[] = [
    {
      name: 'website',
      label: 'Website',
    },
    {
      name: 'discord',
      label: 'Discord',
    },

    {
      name: 'logo',
      label: 'Logo',
      type: 'file',
    },

    {
      name: 'primaryColor',
      label: 'Primary Color',
    },
  ]

  return (
    <FormProvider {...methods}>
      <form onSubmit={_onSubmit}>
        <Grid.Container gap={5}>
          {fields.map((field) => (
            <Grid xs={12} key={field.name}>
              <FormField {...field} register={register} />
            </Grid>
          ))}
        </Grid.Container>
        <Spacer h={2} />
        <Divider />
        <Spacer h={2} />
        <Grid.Container gap={5}>
          {secondaryFields.map((field) => (
            <Grid xs={12} key={field.name}>
              <FormField {...field} register={register} />
            </Grid>
          ))}
        </Grid.Container>

        <Button htmlType="submit">{edit ? 'Update' : 'Create'}</Button>
      </form>
    </FormProvider>
  )
}

export default BucketForm
