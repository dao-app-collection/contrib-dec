import { Text } from '@geist-ui/react'
import useSelectedBucket from '../../hooks/useSelectedBucket'
import FundBucket from '../bucket/FundBucket'
import CreateBucketButton from '../create-bucket/CreateBucketButton'

const Overview: React.FC = () => {
  const selectedBucket = useSelectedBucket()
  console.log(selectedBucket)
  return (
    <div>
      <CreateBucketButton />
      <Text p>{selectedBucket?.description}</Text>

      <FundBucket />
    </div>
  )
}

export default Overview
