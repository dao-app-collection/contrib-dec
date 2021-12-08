import { Input, Modal, Textarea, Spacer, Divider, Grid } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ethers } from 'ethers'
import Select from 'react-select'
import { BucketPayload, Field, FormFieldType } from '../../types/all-types'
import Button from '../../components/Button'
import FormField from '../../components/form/FormField'

type FormData = {
  name: string
  description: string
  tokenAddress: string
  owners: string[]
  discord?: string
  website?: string
  logo?: string
  colorPrimary?: string
}

type Props = {
  owners?: string[]
  defaultOwner?: string
  tokenAddress?: string
  onSubmit: (payload: BucketPayload) => void
  edit?: boolean
  defaultValues: Partial<FormData>
}

const OWNERS =
  '0xf6B186049232cd426E18DD068a205d50c398a2D8,0xa50F556168a2A67EeABD5BAf821212a6F0c8Fe1E,0xC174C9CC0A6686B7F347c7c40cf330486785158d'

const WEENUS_RINKENY_ADDRESS = '0xaFF4481D10270F50f203E0763e2597776068CBc5'

const BucketForm: FC<Props> = ({
  onSubmit,
  owners,
  tokenAddress,
  defaultOwner = OWNERS,
  defaultValues,
  edit,
}) => {
  const methods = useForm<FormData>({
    defaultValues: {
      owners: owners || ['0x01231'],
      tokenAddress: tokenAddress || WEENUS_RINKENY_ADDRESS,
      ...defaultValues,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods
  const _onSubmit = handleSubmit((data) => {
    console.log(data)
    return
    try {
      onSubmit({
        name: data.name,
        description: data.description,
        tokenAddress: ethers.utils.getAddress(data.tokenAddress),
        owners: data.owners.split(',').map(ethers.utils.getAddress),
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
    },
    {
      name: 'tokenAddress',
      label: 'Token Address',
      required: true,
    },

    {
      name: 'owners',
      label: 'Owners',
      required: true,
      type: 'multiselect',
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
