import Decimal from 'decimal.js'
import { useState } from 'react'
import { ethers } from 'ethers'
import useIsBucketOwner from './useIsBucketOwner'
import { useRootStore } from '../context/RootStoreProvider'
import { BucketEntity } from '../stores/entities/Bucket.entity'

type UseFundBucketValue = {
  fundBucket: (amount: Decimal) => Promise<void>
  isFunding: boolean
  canFund: boolean
}

const useFundBucket = ({ bucket }: { bucket?: BucketEntity }): UseFundBucketValue => {
  const { contribBucketFactoryContractStore, web3Store } = useRootStore()
  const [isFunding, setIsCreating] = useState(false)
  const canFund = useIsBucketOwner(bucket)

  const fundBucket = async (amount: Decimal) => {
    if (web3Store.signerState.address) {
      setIsCreating(true)
      try {
        const amountAsBN = ethers.utils.parseEther(amount.toString())
        await bucket?.fund(amountAsBN)
      } catch (e) {
        console.error(e)
      } finally {
        setIsCreating(false)
      }
    } else {
      web3Store.connect()
    }
  }

  return {
    isFunding,
    canFund,
    fundBucket,
  }
}

export default useFundBucket
