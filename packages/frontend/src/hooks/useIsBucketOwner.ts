import { useEffect, useState } from 'react'
import { useRootStore } from '../context/RootStoreProvider'
import { BucketEntity } from '../stores/entities/Bucket.entity'

const useIsBucketOwner = (bucket?: BucketEntity): boolean => {
  const rootStore = useRootStore()
  const userAddress = rootStore.web3Store.signerState.address?.toLowerCase() || ''

  return bucket?.owners.some((owner) => owner.toLowerCase() === userAddress) || false
}

export default useIsBucketOwner
