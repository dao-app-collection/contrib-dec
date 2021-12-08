import { useState } from 'react'
import { useRootStore } from '../context/RootStoreProvider'
import { BucketEntity } from '../stores/entities/Bucket.entity'
import { BucketMetaData } from '../types/all-types'
import ceramic from '../utils/services/ceramic'

type UseUpdateBucketValue = {
  updateBucket: (payload: BucketMetaData) => Promise<boolean>
  isUpdating: boolean
}

const useUpdateBucket = ({ bucket }: { bucket?: BucketEntity }): UseUpdateBucketValue => {
  const { web3Store } = useRootStore()
  const [isUpdating, setIsCreating] = useState(false)

  const updateBucket = async (payload: BucketMetaData) => {
    if (!bucket) {
      return false
    }

    if (web3Store.signerState.address && bucket.owners.includes(web3Store.signerState.address)) {
      let success = false
      setIsCreating(true)
      try {
        await ceramic.update(bucket.ceramicId, payload)
        await bucket.load()
        success = true
      } catch (e) {
        console.error(e)
      } finally {
        setIsCreating(false)
      }

      return success
    }

    return false
  }

  return {
    isUpdating,
    updateBucket,
  }
}

export default useUpdateBucket
