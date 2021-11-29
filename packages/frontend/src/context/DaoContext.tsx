import { useRouter } from 'next/dist/client/router'
import { createContext, FC, useContext } from 'react'
import { DaoConfig, PopulatedBucket, PopulatedTask } from '../types/all-types'
import { getBucketLevel, getBucketUrl } from '../utils/buckets-utils'
import { mockBuckets, mockTasks } from '../utils/mocked'

type DaoContextInterface = {
  navigateTo: () => void
  dao: DaoConfig
  buckets: PopulatedBucket[]
  tasks: PopulatedTask[]
  currentLevel: number
  currentBucket: PopulatedBucket
}

const DaoContext = createContext<DaoContextInterface | null>(null)

export const DaoProvider: FC = ({ children }) => {
  const router = useRouter()

  console.log(router)
  const buckets = mockBuckets.map((bucket) => ({
    ...bucket,
    url: getBucketUrl(bucket, mockBuckets),
    level: getBucketLevel(bucket, mockBuckets),
  }))

  const tasks = mockTasks.map((task) => ({
    ...task,
  }))

  const dao = {
    name: 'DxDao',
    website: '...href',
  }

  const navigateTo = (): void => {
    console.log('nav')
  }

  const value: DaoContextInterface = {
    navigateTo,
    dao,
    buckets,
    tasks,
    currentLevel: 2,
    currentBucket: buckets[2],
  }

  return <DaoContext.Provider value={value}>{children}</DaoContext.Provider>
}

export const useDao = (): DaoContextInterface => {
  const Dao = useContext(DaoContext)
  if (!Dao) {
    throw new Error('Missing DaoContext.Provider')
  }
  return Dao
}
