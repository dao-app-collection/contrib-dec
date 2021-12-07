import { useInput, Grid, Input, Modal, Select, Textarea } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import { ethers } from 'ethers'
import { BucketPayload } from '../../types/all-types'
import Button from '../../components/Button'

type Props = {
  owners?: string
  defaultOwner?: string
  tokenAddress?: string
  onClose: () => void
  onSubmit: (payload: BucketPayload) => void
}

const BucketForm: FC<Props> = ({ onSubmit, owners, tokenAddress, defaultOwner = '' }) => {
  const titleInput = useInput('')
  const ownersInput = useInput(owners || defaultOwner)

  const descriptionInput = useInput('')
  const tokenAddressInput = useInput(tokenAddress || '')

  const handleSubmit = async () => {
    if (
      titleInput.state &&
      tokenAddressInput.state &&
      ownersInput.state &&
      descriptionInput.state
    ) {
      // const result = await ceramic.create({
      //   schema: CeramicSchema.BUCKET_META_DATA,
      //   data: {
      //     title: titleInput.state,
      //     description: descriptionInput.state || '',
      //   },
      // })

      try {
        onSubmit({
          name: titleInput.state,
          tokenAddress: ethers.utils.getAddress(tokenAddressInput.state),
          owners: ownersInput.state.split(',').map(ethers.utils.getAddress),
          description: descriptionInput.state,
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
  return (
    <>
      <Modal.Content>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <Grid.Container gap={2}>
            <Grid xs={24}>
              <Input clearable {...titleInput.bindings} width="100%" placeholder="Name" />
            </Grid>
            <Grid xs={24}>
              <Input
                clearable
                {...ownersInput.bindings}
                disabled={Boolean(owners)}
                width="100%"
                placeholder="Owners"
              />
            </Grid>
            <Grid xs={24}>
              <Input
                clearable
                {...tokenAddressInput.bindings}
                width="100%"
                placeholder="Token address"
                disabled={Boolean(tokenAddress)}
              />
            </Grid>
            <Grid xs={24}>
              <Textarea {...descriptionInput.bindings} width="100%" placeholder="Description" />
            </Grid>
            {/* <Grid xs={24}>
              <Select placeholder="Owners" multiple width="100%" initialValue={[]}>
                {availableOwners.map((address) => (
                  <Select.Option key={address} value={address}>
                    {address}
                  </Select.Option>
                ))}
              </Select>
            </Grid> */}

            <Grid />

            {/* <Grid xs={24}>
              <Input
                clearable
                {...allocationInput.bindings}
                placeholder="Allocation"
                labelRight="ETH"
                width="100%"
                disabled
              />
            </Grid> */}

            <Grid xs={24}>
              <Button htmlType="submit" modifier="dao">
                Create
              </Button>
            </Grid>
          </Grid.Container>
        </form>
      </Modal.Content>
    </>
  )
}

export default BucketForm
