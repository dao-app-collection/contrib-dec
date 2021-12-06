import { useRouter } from 'next/dist/client/router'
import { createContext, FC, useContext, useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useRootStore } from './RootStoreProvider'
import { DAOEntity } from '../stores/entities/DAO.entity'
import { TaskEntity } from '../stores/entities/Task.entity'
import { BucketEntity } from '../stores/entities/Bucket.entity'

type DaoContextInterface = {
  navigateTo: (bucket: BucketEntity) => void
  buckets: BucketEntity[]
  selectedBucket?: BucketEntity
  dao: DAOEntity
  currentTask: TaskEntity | null
  openTask: (task?: TaskEntity) => void
}

const DaoContext = createContext<DaoContextInterface | null>(null)

export const DaoProvider: FC = observer(({ children }) => {
  const router = useRouter()
  const store = useRootStore()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dao = useMemo(() => new DAOEntity(store), [])
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // eslint-disable-next-line prefer-destructuring
  const buckets = store.bucketStore.buckets
  const [slug, setSlug] = useState(router.query.slug)
  const [currentTask, setCurrentTask] = useState<TaskEntity | null>(null)

  const slugStr = typeof slug === 'string' ? slug : slug?.join('')
  const selectedBucket = useMemo(
    () => buckets.find((bucket) => bucket.slug.join('') === slugStr),
    [slugStr]
  )

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dao])

  useEffect(() => {
    setSlug(router.query.slug)
  }, [router.query.slug])

  // const selectedBucket = dao.buckets.find((bucket) => bucket.slug.join('') === slugStr)

  useEffect(() => {
    const task = selectedBucket?.tasks.find((t) => t.id.toLowerCase() === router.query.task)
    if (task) {
      setCurrentTask(task)
    } else {
      setCurrentTask(null)
    }
  }, [selectedBucket?.tasks, router.query.task])

  const openTask = (task?: TaskEntity): void => {
    setCurrentTask(task || null)
    if (task) {
      router.query.task = task.id
    } else {
      delete router.query.task
    }
    router.replace(router)
  }

  const navigateTo = (bucket: BucketEntity): void => {
    setSlug(bucket.slug)
    router.push(
      {
        pathname: '/[...slug]',
        query: {
          slug: bucket.slug,
        },
      },
      { href: bucket.url },
      { shallow: true }
    )
  }

  const value: DaoContextInterface = {
    navigateTo,
    dao,
    buckets,
    selectedBucket,
    openTask,
    currentTask,
  }

  return <DaoContext.Provider value={value}>{children}</DaoContext.Provider>
})

export const useDao = (): DaoContextInterface | null => {
  const Dao = useContext(DaoContext)
  // if (!Dao) {
  //   throw new Error('Missing DaoContext.Provider')
  // }
  return Dao
}
