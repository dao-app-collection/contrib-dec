import { Text } from '@geist-ui/react'
import { ethers } from 'ethers'
import { observer } from 'mobx-react-lite'

import { useRootStore } from '../../context/RootStoreProvider'

const Balance: React.FC = () => {
  const { web3Store } = useRootStore()
  const { balance } = web3Store.signerState
  const formattedBalance = ethers.utils.formatEther(balance || 0)

  return (
    <Text small p>
      {formattedBalance} ETH
    </Text>
  )
}

export default observer(Balance)
