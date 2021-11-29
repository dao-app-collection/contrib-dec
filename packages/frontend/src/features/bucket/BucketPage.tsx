import { FC } from 'react'
import BucketCanvas from './BucketCanvas'
import { useDao } from '../../context/DaoContext'
import Heading from '../../components/Heading'

const BucketPage: FC = () => {
  const context = useDao()

  return (
    <div>
      <Heading type="h1">{context.dao.name}</Heading>
      <BucketCanvas buckets={context.buckets} />
    </div>
  )
}

export default BucketPage
