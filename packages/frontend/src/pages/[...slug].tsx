import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import { FC } from 'react'
import DAOLayout from '../components/DAOLayout'
import { DaoProvider } from '../context/DaoContext'
import BucketPage from '../features/bucket/BucketPage'
import { getEntityFromSlug } from '../utils/services/bucket-api'

const SlugPage: FC = (props) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>fallback...</div>
  }

  return (
    <DAOLayout colors={{ primary: '#7B4BFF', inverted: '#FFF' }}>
      <DaoProvider>
        <BucketPage />
      </DaoProvider>
    </DAOLayout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params = {} } = context || {}
  let entity = null

  try {
    const result = await getEntityFromSlug(params.slug as string[])

    if (!result) {
      throw new Error('Missing entity')
    }
    entity = result
  } catch (e) {
    console.error(e)

    return {
      notFound: true,
    }
  }

  return {
    props: {
      slug: params.slug,
      entity,
      type: params.type || null,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  //   const [buckets, tasks] = await Promise.all([getAllBuckets(), getAllTasks()])
  //   const bucketPaths = buckets.map((bucket) => ({
  //     params: { id: bucket.id, slug: getBucketSlug(bucket, buckets), type: 'bucket' },
  //   }))

  //   const taskPaths = tasks
  //     .map((task) => {
  //       const match = bucketPaths.find((bucket) => bucket.params.id === task.bucket)
  //       if (match) {
  //         return {
  //           params: { id: task.id, slug: [...match.params.slug, task.id], type: 'task' },
  //         }
  //       }
  //       return {
  //         params: {},
  //       }
  //     })
  //     .filter((item) => item.params.slug)

  //   const paths = [...bucketPaths, ...taskPaths]

  return { paths: [], fallback: true }
}

export default SlugPage
