import { observer } from 'mobx-react-lite'
import Button from '../../components/Button'
import { useRootStore } from '../../context/RootStoreProvider'

const CreateBucketButton: React.FC = () => {
  const { contribBucketFactoryContractStore, web3Store } = useRootStore()
  const label = web3Store.signerState.address ? 'Create Bucket' : 'Connect Wallet to create Bucket'

  const onClick = () => {
    if (web3Store.signerState.address) {
      contribBucketFactoryContractStore.createBucket(
        [web3Store.signerState.address],
        'My Bucket',
        ''
      )
    } else {
      web3Store.connect()
    }
  }

  return (
    <Button onClick={onClick} width="100%" modifier="dao">
      {label}
    </Button>
  )
}

export default observer(CreateBucketButton)
