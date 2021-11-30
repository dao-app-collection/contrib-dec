import { useMemo } from 'react'
import { useDao } from '../context/DaoContext'
import { BucketEntity } from '../stores/entities/Bucket.entity'

const useSelectedBucket = (): BucketEntity | undefined => {
  const context = useDao()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selected = useMemo(() => context.selectedBucket, [context.selectedBucket?.id])

  return selected
}

export default useSelectedBucket
