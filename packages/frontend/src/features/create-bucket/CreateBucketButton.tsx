import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import CreateBucketModal from './CreateBucketModal'
import Button from '../../components/Button'
import { useRootStore } from '../../context/RootStoreProvider'
import { EMPTY_CONTRACT_ADDRESS } from '../../lib/constants'
import useSelectedBucket from '../../hooks/useSelectedBucket'
import { BucketPayload } from '../../types/all-types'
import ceramic, { CeramicSchema } from '../../utils/services/ceramic'

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
      try {
        const ceramicId = await ceramic.create({
          schema: CeramicSchema.BUCKET_META_DATA,
          data: {
            title: payload.name,
            description: payload.description,
          },
        })

        console.log('ceramicID:', ceramicId)
        const tx = await contribBucketFactoryContractStore.createBucket(
          payload.owners,
          payload.name,
          ceramicId,
          payload.tokenAddress,
          '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
        )
        console.log('tx::', tx)
      } catch (e) {
        console.error(e)
      }

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
