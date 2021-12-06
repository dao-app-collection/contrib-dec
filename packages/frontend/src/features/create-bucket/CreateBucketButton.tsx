import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import CreateBucketModal from './CreateBucketModal'
import Button from '../../components/Button'
import { useRootStore } from '../../context/RootStoreProvider'
import useSelectedBucket from '../../hooks/useSelectedBucket'

const CreateBucketButton: React.FC = () => {
  const { contribBucketFactoryContractStore, web3Store } = useRootStore()
  const label = web3Store.signerState.address ? 'Create Bucket' : 'Connect Wallet to create Bucket'
  const [visible, setVisible] = useState(false)
  const selectedBucket = useSelectedBucket()

  const onClick = () => {
    setVisible(true)
  }

  return (
    <>
      <Button
        onClick={onClick}
        width="100%"
        modifier="dao"
        loading={contribBucketFactoryContractStore.creatingBucket}
      >
        {label}
      </Button>
      <CreateBucketModal
        visible={visible}
        onClose={() => setVisible(false)}
        selectedBucket={selectedBucket}
      />
    </>
  )
}

export default observer(CreateBucketButton)
