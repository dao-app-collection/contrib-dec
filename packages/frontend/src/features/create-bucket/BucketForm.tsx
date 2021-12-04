import { useInput, Grid, Input, Modal, Select, Textarea } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import { BucketPayload } from '../../types/all-types'
import ceramic, { CeramicSchema } from '../../utils/services/ceramic'
import Button from '../../components/Button'

type Props = { onClose: () => void; onSubmit: (payload: BucketPayload) => void }

const BucketForm: FC<Props> = ({ onClose, onSubmit }) => {
  const availableOwners = [
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    '0xCCCFd6e51aad88F6F4ce6aB8827279cffFb92266',
  ]

  const titleInput = useInput('')
  const descriptionInput = useInput('')

  const allocationInput = useInput('')

  const handleSubmit = async () => {
    if (titleInput.state && descriptionInput.state) {
      const result = await ceramic.create({
        schema: CeramicSchema.BUCKET_META_DATA,
        data: {
          title: titleInput.state,
          description: descriptionInput.state,
        },
      })

      onSubmit({
        name: titleInput.state,
      })
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
              <Input clearable {...titleInput.bindings} width="100%" placeholder="Title" />
            </Grid>
            <Grid xs={24}>
              <Textarea {...descriptionInput.bindings} width="100%" placeholder="Description" />
            </Grid>
            <Grid xs={24}>
              <Select placeholder="Owners" multiple width="100%" initialValue={[]}>
                {availableOwners.map((address) => (
                  <Select.Option key={address} value={address}>
                    {address}
                  </Select.Option>
                ))}
              </Select>
            </Grid>

            <Grid xs={24}>
              <Input
                clearable
                {...allocationInput.bindings}
                placeholder="Allocation"
                labelRight="ETH"
                width="100%"
              />
            </Grid>

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
