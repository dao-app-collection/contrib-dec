import { Button, Input, Spacer } from '@geist-ui/react'
import Decimal from 'decimal.js'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { BigNumber } from 'ethers'
import { useRootStore } from '../../context/RootStoreProvider'
import useFundBucket from '../../hooks/useFundBucket'
import useSelectedBucket from '../../hooks/useSelectedBucket'

const FundBucket: FC = () => {
  const bucket = useSelectedBucket()
  const { web3Store } = useRootStore()
  const { canFund, isFunding, fundBucket } = useFundBucket({ bucket })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  if (!bucket) {
    return null
  }
  if (bucket.level === 1) {
    return null
  }

  const onSubmit = async (data: { amount: string }) => {
    const shouldAllowTokens = bucket?.token.needsToAllowTokens(
      web3Store.signerState.address,
      BigNumber.from(data.amount)
    )

    console.log({ shouldAllowTokens })

    await fundBucket(new Decimal(data.amount))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input width="100%" {...register('amount')} disabled={!canFund} required labelRight="ETH" />

      <Spacer h={1} />
      <Button width="100%" disabled={!canFund} loading={isFunding} htmlType="submit">
        Fund
      </Button>
    </form>
  )
}

export default observer(FundBucket)
