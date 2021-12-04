import { Text, Button } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../../context/RootStoreProvider'

const CreateBucketButton: React.FC = () => {
  const { contribBucketFactoryContractStore, web3Store } = useRootStore()

  const onClick = () => {
    if (web3Store.signerState.address) {
      contribBucketFactoryContractStore.createBucket(
        [web3Store.signerState.address],
        'My Bucket',
        ''
      )
    }
  }

  if (!web3Store.signerState.address) {
    return <Text h1>Connect your wallet to get started</Text>
  }

  return (
    <Button onClick={onClick} type="secondary" ghost auto scale={2}>
      Create Bucket
    </Button>
  )
}

export default observer(CreateBucketButton)
