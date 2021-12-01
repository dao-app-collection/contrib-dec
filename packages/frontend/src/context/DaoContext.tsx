import { useRouter } from 'next/dist/client/router'
import { createContext, FC, useContext, useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useRootStore } from './RootStoreProvider'
import { DAOEntity } from '../stores/entities/DAO.entity'
import { BucketEntity } from '../stores/entities/Bucket.entity'

type DaoContextInterface = {
  navigateTo: (bucket: BucketEntity) => void
  buckets: BucketEntity[]
  selectedBucket?: BucketEntity
  dao: DAOEntity
}

const DaoContext = createContext<DaoContextInterface | null>(null)

export const DaoProvider: FC = observer(({ children }) => {
  const router = useRouter()
  const store = useRootStore()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dao = useMemo(() => new DAOEntity(store), [])
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const [slug, setSlug] = useState(router.query.slug)

  useEffect(() => {
    dao.init(slug as string[])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dao])

  useEffect(() => {
    setSlug(router.query.slug)
  }, [router.query.slug])

  const slugStr = typeof slug === 'string' ? slug : slug?.join('')

  const selectedBucket = dao.buckets.find((bucket) => bucket.slug.join('') === slugStr)
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
    buckets: dao.buckets,
    selectedBucket,
  }

  return <DaoContext.Provider value={value}>{children}</DaoContext.Provider>
})

export const useDao = (): DaoContextInterface => {
  const Dao = useContext(DaoContext)
  if (!Dao) {
    throw new Error('Missing DaoContext.Provider')
  }
  return Dao
}
