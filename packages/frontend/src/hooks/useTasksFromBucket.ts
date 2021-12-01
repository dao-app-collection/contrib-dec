import useSelectedBucket from './useSelectedBucket'
import { TaskEntity } from '../stores/entities/Task.entity'

const useTasks = (): TaskEntity[] => {
  const bucket = useSelectedBucket()

  return bucket?.tasks || []
}

export default useTasks
