import { Text } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import useSelectedBucket from '../../hooks/useSelectedBucket'
import FundBucket from '../bucket/FundBucket'
import CreateBucketButton from '../create-bucket/CreateBucketButton'
import CreateSubBucketButton from '../create-bucket/CreateSubBucketButton'

const Overview: React.FC = () => {
  const selectedBucket = useSelectedBucket()
  if (!selectedBucket) {
    return null
  }

  return (
    <div>
      <CreateSubBucketButton />
      <Text p>{selectedBucket?.description}</Text>
      <Text p>
        Allocation: {selectedBucket.test} {selectedBucket.tokenSymbol}
      </Text>
      <FundBucket />
    </div>
  )
}

export default observer(Overview)
