import { observer } from 'mobx-react-lite'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { FC } from 'react'
import DAOLayout from '../components/DAOLayout'
import PageLoader from '../components/PageLoader'
import SEO from '../components/SEO'
import { DaoProvider } from '../context/DaoContext'
import { useRootStore } from '../context/RootStoreProvider'
import BucketPage from '../features/bucket/BucketPage'
import DAOList from '../features/landing/DAOList'
import { getBucketSlug } from '../utils/buckets-utils'
import { getAllBuckets, getEntityFromSlug } from '../utils/services/bucket-api'

const SlugPage: FC = (props) => {
  const store = useRootStore()

  if (store.bucketStore.loading) {
    return (
      <>
        <DAOList />
        <SEO
          title="Contrib. | Get a clear overview of tasks and token flows in your DAO"
          description="DAO contribution and experience, validated on-chain"
        />
      </>
    )
  }

  return (
    <DaoProvider>
      <BucketPage />
    </DaoProvider>
  )
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { params = {} } = context || {}
//   let entity = null

//   try {
//     const result = await getEntityFromSlug(params.slug as string[])

//     if (!result) {
//       throw new Error('Missing entity')
//     }
//     entity = result
//   } catch (e) {
//     console.error(e)

//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {
//       slug: params.slug,
//       entity,
//       type: params.type || null,
//     },
//   }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const [buckets] = await Promise.all([getAllBuckets()])
//   const bucketPaths = buckets.map((bucket) => ({
//     params: { id: bucket.id, slug: getBucketSlug(bucket, buckets), type: 'bucket' },
//   }))

//   const paths = [...bucketPaths]

//   return { paths, fallback: true }
// }

export default observer(SlugPage)
