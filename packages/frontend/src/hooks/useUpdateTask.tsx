import { useState } from 'react'
import { useRootStore } from '../context/RootStoreProvider'
import { TaskEntity } from '../stores/entities/Task.entity'
import { TaskMetaData } from '../types/all-types'
import ceramic from '../utils/services/ceramic'

type UseUpdateTaskValue = {
  updateTask: (payload: TaskMetaData) => Promise<boolean>
  isUpdating: boolean
}

const useUpdateTask = ({ task }: { task?: TaskEntity }): UseUpdateTaskValue => {
  const { web3Store } = useRootStore()
  const [isUpdating, setIsCreating] = useState(false)

  const updateTask = async (payload: TaskMetaData) => {
    if (!task) {
      return false
    }

    if (web3Store.signerState.address) {
      let success = false
      setIsCreating(true)
      try {
        await ceramic.update(task.ceramicId, payload)
        await task.load()
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
    updateTask,
  }
}

export default useUpdateTask
