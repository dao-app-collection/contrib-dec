import { useState } from 'react'
import { useRootStore } from '../context/RootStoreProvider'
import { BucketEntity } from '../stores/entities/Bucket.entity'
import { BucketMetaData } from '../types/all-types'
import ceramic from '../utils/services/ceramic'

type UseUpdateBucketValue = {
  updateBucket: (payload: BucketMetaData) => Promise<void>
  isUpdating: boolean
}

const useUpdateBucket = ({ bucket }: { bucket?: BucketEntity }): UseUpdateBucketValue => {
  const { web3Store } = useRootStore()
  const [isUpdating, setIsCreating] = useState(false)

  const updateBucket = async (payload: BucketMetaData) => {
    if (!bucket) {
      return
    }

    if (web3Store.signerState.address && bucket.owners.includes(web3Store.signerState.address)) {
      setIsCreating(true)
      try {
        await ceramic.update(bucket.ceramicId, payload)
        bucket.load()
      } catch (e) {
        console.error(e)
      } finally {
        setIsCreating(false)
      }
    }
  }

  return {
    isUpdating,
    updateBucket,
  }
}

export default useUpdateBucket
