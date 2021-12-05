import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import CreateBucketModal from './CreateBucketModal'
import Button from '../../components/Button'
import { useRootStore } from '../../context/RootStoreProvider'
import { EMPTY_CONTRACT_ADDRESS } from '../../lib/constants'
import useSelectedBucket from '../../hooks/useSelectedBucket'
import { BucketPayload } from '../../types/all-types'

const CreateBucketButton: React.FC = () => {
  const { contribBucketFactoryContractStore, web3Store } = useRootStore()
  const label = web3Store.signerState.address ? 'Create Bucket' : 'Connect Wallet to create Bucket'
  const [visible, setVisible] = useState(false)
  const selectedBucket = useSelectedBucket()

  const onClick = () => {
    setVisible(true)
  }

  const onCreate = async (payload: BucketPayload) => {
    if (web3Store.signerState.address) {
      const success = await contribBucketFactoryContractStore.createBucket(
        payload.owners,
        payload.name,
        payload.tokenAddress,
        EMPTY_CONTRACT_ADDRESS
      )
      setVisible(false)
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
        onCreate={onCreate}
        onClose={() => setVisible(false)}
        selectedBucket={selectedBucket}
      />
    </>
  )
}

export default observer(CreateBucketButton)
