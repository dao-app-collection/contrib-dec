import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import { useRootStore } from '../context/RootStoreProvider'
import { EMPTY_CONTRACT_ADDRESS } from '../lib/constants'
import { BucketEntity } from '../stores/entities/Bucket.entity'
import { BucketPayload } from '../types/all-types'
import ceramic, { CeramicSchema } from '../utils/services/ceramic'

type UseCreateBucketValue = {
  createBucket: (payload: BucketPayload) => Promise<void>
  creating: boolean
}

const useCreateBucket = ({
  parentBucket,
}: {
  parentBucket?: BucketEntity
}): UseCreateBucketValue => {
  const { contribBucketFactoryContractStore, web3Store } = useRootStore()
  const [creating, setIsCreating] = useState(false)

  const createBucket = async (payload: BucketPayload) => {
    if (web3Store.signerState.address) {
      setIsCreating(true)
      try {
        const ceramicId = await ceramic.create({
          schema: CeramicSchema.BUCKET_META_DATA,
          data: {
            title: payload.name,
            description: payload.description,
          },
        })

        const tx = await contribBucketFactoryContractStore.createBucket(
          payload.owners,
          payload.name,
          ceramicId,
          parentBucket ? parentBucket.token : payload.tokenAddress,
          parentBucket ? parentBucket.id : EMPTY_CONTRACT_ADDRESS
        )
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
    creating,
    createBucket,
  }
}

export default useCreateBucket
