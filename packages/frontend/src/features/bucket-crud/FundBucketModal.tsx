import { Button, Input, Spacer } from '@geist-ui/react'
import Decimal from 'decimal.js'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from '../../components/form/FormInput'
import Modal from '../../components/Modal'
import useFundBucket from '../../hooks/useFundBucket'
import { BucketEntity } from '../../stores/entities/Bucket.entity'

type Props = {
  visible: boolean
  onClose: () => void
  selectedBucket: BucketEntity
}

const FundBucketModal: FC<Props> = ({ onClose, visible, selectedBucket }) => {
  const { isFunding, fundBucket } = useFundBucket({ bucket: selectedBucket })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const _onSubmit = handleSubmit(async (data) => {
    await fundBucket(new Decimal(data.amount))
    onClose()
    reset()
  })

  return (
    <Modal
      title="Fund bucket"
      width="25rem"
      loading={isFunding}
      visible={visible}
      onClose={onClose}
    >
      <form onSubmit={_onSubmit}>
        <FormInput
          labelRight={selectedBucket.getSymbol()}
          label="Amount"
          name="amount"
          required
          register={register}
        />
        <Spacer h={2} />
        <Button type="secondary" htmlType="submit">
          Fund
        </Button>
      </form>
    </Modal>
  )
}

export default observer(FundBucketModal)
