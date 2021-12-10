import { Description, Divider, Link, Spacer, Text } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import Transactions from './Transactions'
import useSelectedBucket from '../../hooks/useSelectedBucket'

const Overview: React.FC = () => {
  const selectedBucket = useSelectedBucket()

  if (!selectedBucket) {
    return null
  }

  return (
    <div>
      <Text p>
        <div>
          <Description title="Description" />
          {selectedBucket?.data.description}
        </div>
        {selectedBucket?.data.discord && (
          <div>
            <Spacer h={2} />
            <Description title="Discord" />
            <Link href={selectedBucket?.data.discord}>{selectedBucket?.data.discord}</Link>
          </div>
        )}
        {selectedBucket?.data.website && (
          <div>
            <Spacer h={2} />
            <Description title="Website" />
            <Link href={selectedBucket?.data.website}>{selectedBucket?.data.website}</Link>
          </div>
        )}
        <Spacer h={2} />
        <Description title="Allocation" />
        {selectedBucket?.allocation?.toString()} {selectedBucket.token.symbol()}
      </Text>
      <Spacer h={2} />
      <Divider />
      <Spacer h={2} />
      <div>
        <Description title="Transactions" />
        <Transactions />
      </div>
    </div>
  )
}

export default observer(Overview)
