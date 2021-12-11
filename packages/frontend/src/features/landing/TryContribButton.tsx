import { Button } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import { useRootStore } from '../../context/RootStoreProvider'
import { spacingIncrement } from '../../theme/utils'
import CreateBucketModal from '../bucket-crud/CreateBucketModal'

const buttonBackground = css`
  background: #8134ff;
  background: -webkit-linear-gradient(top left, #8134ff, #d477ff);
  background: -moz-linear-gradient(top left, #8134ff, #d477ff);
  background: linear-gradient(to bottom right, #8134ff, #d477ff);
  color: white;
`

const CallToAction = styled(Button)`
  &&& {
    ${buttonBackground};
    font-size: ${({ theme }) => theme.fontSize.base};
    font-weight: 600;
    height: auto;
    padding: ${spacingIncrement(8)} 0;

    :hover {
      ${buttonBackground};
      border: 1px solid white;

      color: white;
    }
  }
`

const TryContribButton: React.FC = () => {
  const { web3Store, contribBucketFactoryContractStore } = useRootStore()
  const [visible, setVisible] = useState(false)
  const label = web3Store.signerState.address ? 'Try Contrib now' : 'Connect Wallet'

  const onClick = () => {
    if (web3Store.signerState.address) {
      setVisible(true)
    } else {
      web3Store.connect()
    }
  }

  return (
    <>
      <CallToAction onClick={onClick} loading={contribBucketFactoryContractStore.creatingBucket}>
        {label}
      </CallToAction>
      <CreateBucketModal visible={visible} onClose={() => setVisible(false)} />
    </>
  )
}

export default observer(TryContribButton)
