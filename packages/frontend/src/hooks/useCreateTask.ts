import Decimal from 'decimal.js'
import { useState } from 'react'
import { ethers } from 'ethers'
import useIsBucketOwner from './useIsBucketOwner'
import { useRootStore } from '../context/RootStoreProvider'
import { BucketEntity } from '../stores/entities/Bucket.entity'
import { TaskPayload } from '../types/all-types'
import ceramic, { CeramicSchema } from '../utils/services/ceramic'

type UseFundBucketValue = {
  createTask: (payload: TaskPayload) => Promise<boolean>
  isCreating: boolean
  canCreateTask: boolean
}

const useCreateTask = ({
  selectedBucket,
}: {
  selectedBucket?: BucketEntity
}): UseFundBucketValue => {
  const { web3Store, uiStore } = useRootStore()
  const [isCreating, setIsCreating] = useState(false)
  const canCreateTask = useIsBucketOwner(selectedBucket)

  const createTask = async (payload: TaskPayload) => {
    console.log('gets here!', { payload })
    if (web3Store.signerState.address) {
      let success = false
      setIsCreating(true)
      try {
        console.log('::::', payload.data)
        const ceramicId = await ceramic.create({
          schema: CeramicSchema.TASK_META_DATA,
          data: payload.data,
        })

        console.log({ ceramicId })

        const tx = await selectedBucket?.createTask({
          data: ceramicId,
          deadline: payload.deadline,
          issuers: payload.issuers,
          approvers: payload.approvers,
        })
        success = true
      } catch (e) {
        uiStore.errorToast('Create task error', e)
      } finally {
        setIsCreating(false)
      }
      return success
    }

    web3Store.connect()
    return false
  }

  return {
    isCreating,
    canCreateTask,
    createTask,
  }
}

export default useCreateTask
