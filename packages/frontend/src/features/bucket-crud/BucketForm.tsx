import { Spacer, Divider, Grid } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ethers } from 'ethers'
import styled from 'styled-components'
import { BucketPayload, Field, FormFieldType } from '../../types/all-types'
import Button from '../../components/Button'
import FormField from '../../components/form/FormField'
import { OWNERS } from '../../lib/constants'
import { spacingIncrement } from '../../theme/utils'

const Form = styled.form`
  padding: ${spacingIncrement(30)};
`

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
      owners: defaultValues.owners || [],
      tokenAddress: defaultValues.tokenAddress || '',
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

    if (ownersCorrect.length === 0) {
      return
    }

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
      // disabled: edit,
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
      <Form onSubmit={_onSubmit}>
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
      </Form>
    </FormProvider>
  )
}

export default BucketForm

// contrib-orakuru: 0x1a5d7f73c67dfd2d894ebe2a81103baf4f5c37a8
// contrib-dxdao: 0x157e58ca378333458e066db7e2f6cf1c2fad2ec3
// contrib-rome: 0xbb10e4c54e96d6331badf17b66eab893bad5d5d4
// contrib-mate: 0xc174c9cc0a6686b7f347c7c40cf330486785158d

// kaji — Today at 10:40 PM
// '',

// '0xa50F556168a2A67EeABD5BAf821212a6F0c8Fe1E',
// '0xf6B186049232cd426E18DD068a205d50c398a2D8',
//   0xC174C9CC0A6686B7F347c7c40cf330486785158d
//   0xf3476b36fc9942083049C04e9404516703369ef3
//   0xC174C9CC0A6686B7F347c7c40cf330486785158d
