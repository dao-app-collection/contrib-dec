import { Button, Input, Spacer } from '@geist-ui/react'
import Decimal from 'decimal.js'
import * as React from 'react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import useFundBucket from '../../hooks/useFundBucket'
import useSelectedBucket from '../../hooks/useSelectedBucket'

const FundBucket: FC = () => {
  const bucket = useSelectedBucket()
  const { canFund, isFunding, fundBucket } = useFundBucket({ bucket })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (!canFund) {
    return null
  }

  const onSubmit = (data: { amount: string }) => {
    fundBucket(new Decimal(data.amount))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input width="100%" {...register('amount')} required labelRight="ETH" />

      <Spacer h={1} />
      <Button width="100%" loading={isFunding} htmlType="submit">
        Fund
      </Button>
    </form>
  )
}

export default FundBucket
