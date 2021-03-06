import { useRouter } from 'next/dist/client/router'
import React, { createContext, FC, useContext, useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled, { createGlobalStyle } from 'styled-components'
import { useRootStore } from './RootStoreProvider'
import { DAOEntity } from '../stores/entities/DAO.entity'
import { TaskEntity } from '../stores/entities/Task.entity'
import { BucketEntity } from '../stores/entities/Bucket.entity'
import SEO from '../components/SEO'
import DAOList from '../features/landing/DAOList'

const DAOStyle = createGlobalStyle<{ primary: string }>`
  html {
     --dao-primary-color: ${(props) => props.primary};
  }
`

const EmptyPage = styled.div`
  margin: 10% auto;
  max-width: 1100px;
`

type DaoContextInterface = {
  navigateTo: (bucket: BucketEntity) => void
  buckets: BucketEntity[]
  selectedBucket?: BucketEntity
  dao: DAOEntity
  currentTask: TaskEntity | null
  openTask: (task?: TaskEntity) => void
}

const DaoContext = createContext<DaoContextInterface>({} as DaoContextInterface)

const _DaoProvider: FC = ({ children }) => {
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
    () => buckets.find((bucket) => bucket.slug.join('').toLowerCase() === slugStr?.toLowerCase()),
    [slugStr]
  )

  useEffect(() => {
    setSlug(router.query.slug)
  }, [router.query.slug])

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

  const parents = selectedBucket?.getTreeUp() || []
  const title = selectedBucket
    ? parents
        .map((b) => b.name)
        .reverse()
        .join(' - ')
    : 'Loading ...'

  if (!selectedBucket) {
    return (
      <EmptyPage>
        <SEO title="Contrib." />
        <DAOList />
      </EmptyPage>
    )
  }

  return (
    <DaoContext.Provider value={value}>
      <DAOStyle primary={selectedBucket?.color || ''} />
      <SEO title={title} />
      {children}
    </DaoContext.Provider>
  )
}

export const DaoProvider = observer(_DaoProvider)

export const useDao = (): DaoContextInterface => {
  const Dao = useContext(DaoContext)
  if (!Dao) {
    throw new Error('Missing DaoContext.Provider')
  }
  return Dao
}
