import { Text } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import useSelectedBucket from '../../hooks/useSelectedBucket'
import FundBucket from '../bucket/FundBucket'
import CreateSubBucketButton from '../bucket-crud/CreateSubBucketButton'

const Overview: React.FC = () => {
  const selectedBucket = useSelectedBucket()

  if (!selectedBucket) {
    return null
  }

  return (
    <div>
      <CreateSubBucketButton />
      <Text p>
        {selectedBucket?.data.description}
        Discord: {selectedBucket?.data.discord}
        Website: {selectedBucket?.data.website}
      </Text>
      <Text p>
        Allocation: {selectedBucket?.allocation?.toString()} {selectedBucket.token.symbol()}
      </Text>
      <FundBucket />
    </div>
  )
}

export default observer(Overview)
