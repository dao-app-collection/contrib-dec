import { observer } from 'mobx-react-lite'
import Button from '../../components/Button'
import { useRootStore } from '../../context/RootStoreProvider'
import { EMPTY_CONTRACT_ADDRESS } from '../../lib/constants'

const CreateBucketButton: React.FC = () => {
  const { contribBucketFactoryContractStore, web3Store } = useRootStore()
  const label = web3Store.signerState.address ? 'Create Bucket' : 'Connect Wallet to create Bucket'

  const onClick = () => {
    if (web3Store.signerState.address) {
      contribBucketFactoryContractStore.createBucket(
        [web3Store.signerState.address],
        'My Bucket',
        EMPTY_CONTRACT_ADDRESS
      )
    } else {
      web3Store.connect()
    }
  }

  return (
    <Button
      onClick={onClick}
      width="100%"
      modifier="dao"
      loading={contribBucketFactoryContractStore.creatingBucket}
    >
      {label}
    </Button>
  )
}

export default observer(CreateBucketButton)
