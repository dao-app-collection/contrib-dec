import { useRootStore } from '../context/RootStoreProvider'
import { BucketEntity } from '../stores/entities/Bucket.entity'

const useIsBucketOwner = (bucket?: BucketEntity): boolean => {
  const rootStore = useRootStore()

  return bucket?.owners.includes(rootStore.web3Store.signerState.address || '') || false
}

export default useIsBucketOwner
