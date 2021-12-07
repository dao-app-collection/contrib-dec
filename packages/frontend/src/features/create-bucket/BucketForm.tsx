import { useInput, Grid, Input, Modal, Select, Textarea, Spacer, Divider } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { ethers } from 'ethers'
import { BucketColors, BucketPayload } from '../../types/all-types'
import Button from '../../components/Button'

type FormData = {
  name: string
  description: string
  tokenAddress: string
  owners: string
  discord?: string
  website?: string
  logo?: string

  colorPrimary?: string
  colorInverted?: string
  colorAccent?: string
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      owners: owners?.join(',') || defaultOwner,
      tokenAddress: tokenAddress || WEENUS_RINKENY_ADDRESS,
      ...defaultValues,
    },
  })

  const _onSubmit = handleSubmit((data) => {
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

  return (
    <>
      <Modal.Content>
        <form onSubmit={_onSubmit}>
          <Input clearable {...register('name', { required: true })} width="100%" disabled={edit}>
            Name
          </Input>

          <Spacer h={1} />

          <Textarea
            {...register('description', { required: true })}
            width="100%"
            placeholder="Description"
          />
          <Spacer h={1} />
          <Input
            {...(register('owners'), { required: true })}
            disabled={edit}
            width="100%"
            placeholder="Owners"
          >
            Owners
          </Input>
          <Spacer h={1} />
          <Input
            {...register('tokenAddress', { required: true })}
            disabled={edit}
            // disabled={Boolean(owners)}
            width="100%"
            placeholder="Token address"
          >
            Token address
          </Input>
          <Spacer h={1} />
          <Divider h={1} />
          <Spacer h={1} />
          <Input clearable {...register('colorPrimary')} width="100%">
            Color primary
          </Input>

          <Spacer h={1} />
          <Input clearable {...register('colorInverted')} width="100%">
            Color inverted
          </Input>

          <Spacer h={1} />
          <Input clearable {...register('colorAccent')} width="100%">
            Color accent
          </Input>

          <Spacer h={1} />
          <Input clearable {...register('discord')} width="100%">
            Discord
          </Input>

          <Spacer h={1} />
          <Input clearable {...register('website')} width="100%">
            Website
          </Input>

          <Spacer h={1} />
          <Input clearable {...register('logo')} width="100%">
            Logo .png link
          </Input>

          <Spacer h={2} />
          <Button htmlType="submit" modifier="dao">
            {edit ? 'Update' : 'Create'}
          </Button>
        </form>
      </Modal.Content>
    </>
  )
}

export default BucketForm
