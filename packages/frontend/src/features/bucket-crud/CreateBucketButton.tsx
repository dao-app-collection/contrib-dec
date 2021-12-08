import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import CreateBucketModal from './CreateBucketModal'
import Button from '../../components/Button'
import { useRootStore } from '../../context/RootStoreProvider'
import { BucketEntity } from '../../stores/entities/Bucket.entity'

type Props = {
  selectedBucket?: BucketEntity
}

const CreateBucketButton: React.FC<Props> = ({ selectedBucket }) => {
  const { web3Store, contribBucketFactoryContractStore } = useRootStore()

  const label = web3Store.signerState.address ? 'Create Bucket' : 'Connect Wallet to create Bucket'
  const [visible, setVisible] = useState(false)

  const onClick = () => {
    if (web3Store.signerState.address) {
      setVisible(true)
    } else {
      web3Store.connect()
    }
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
