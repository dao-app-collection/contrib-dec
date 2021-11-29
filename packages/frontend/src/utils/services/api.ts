import { TheGraphBucket, TheGraphTask, TaskPopulated } from '../../types/all-types'
import { mockBuckets } from '../buckets-utils'
import { mockTasks } from '../mocked'

export const getBucket = async (id: string): Promise<TheGraphBucket | void> => {
  return mockBuckets.find((bucket) => bucket.id.toLowerCase() === id.toLowerCase())
}

export const getTaskFromId = async (id: string): Promise<TheGraphTask | void> => {
  return mockTasks.find((task) => task.id.toLowerCase() === id.toLowerCase())
}

export const getBucketFromSlug = (slug: string): TheGraphBucket | void => {
  return mockBuckets.find((bucket) => bucket.name.toLowerCase() === slug.toLowerCase())
}

export const getEntityFromSlug = async (
  slug: string[]
): Promise<TheGraphBucket | TaskPopulated | void> => {
  const lastSlug = slug[slug.length - 1]

  const match = getBucketFromSlug(lastSlug)

  if (match) {
    return match
  }

  const task = await getTaskFromId(lastSlug)

  if (task) {
    const taskBucket = getBucketFromSlug(slug[slug.length - 2])

    if (taskBucket?.id === task.bucket) {
      return { ...task }
    }
  }

  return undefined
}

export const getAllBuckets = async (): Promise<TheGraphBucket[]> => {
  return Promise.resolve(mockBuckets)
}

export const getAllTasks = (): Promise<TheGraphTask[]> => {
  return Promise.resolve(mockTasks)
}
