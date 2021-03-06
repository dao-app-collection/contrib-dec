import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Button, Modal, Spacer, Grid } from '@geist-ui/react'
import Identicon from './Identicon'
import Balance from './Balance'
import { getShortAccount } from '../../utils/account-utils'
import { useRootStore } from '../../context/RootStoreProvider'
import { centered, spacingIncrement } from '../../theme/utils'

const Wrapper = styled.div`
  ${centered};
`

const BalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-right: ${spacingIncrement(16)};
`

const Flex = styled.div`
  display: flex;
`

const Body = styled.div`
  padding: ${spacingIncrement(16)};
`

const AccountIcon = styled(Identicon)`
  margin-left: ${spacingIncrement(16)};
`

const ConnectButton: React.FC = () => {
  const { uiStore, web3Store } = useRootStore()
  const { signerState } = web3Store
  const account = signerState.address
  const { balance } = signerState

  const onClickLogin = (): void => {
    web3Store.connect()
  }

  const onOpenModal = (): void => {
    uiStore.setAccountModalOpen(true)
  }

  const closeHandler = () => {
    uiStore.setAccountModalOpen(false)
  }

  const disconnect = () => {
    web3Store.disconnect()
    closeHandler()
  }

  const onClick = account ? onOpenModal : onClickLogin

  return (
    <Wrapper>
      {/* {balance && (
        <BalanceWrapper>
          <Balance />
        </BalanceWrapper>
      )} */}
      <Flex>
        <Button onClick={onClick}>
          {getShortAccount(account) ?? 'Connect Wallet'}
          <Spacer w={0.5} inline />
          <AccountIcon account={account} />
        </Button>
      </Flex>
      <Modal visible={uiStore.accountModalOpen} onClose={closeHandler}>
        <Modal.Title>Account</Modal.Title>
        <Body>
          <Modal.Content>
            <Grid.Container gap={2} justify="space-between">
              <Grid alignItems="center" justify="center">
                {getShortAccount(account) ?? 'Connect Wallet'}
                <Spacer w={0.5} inline />
                <AccountIcon account={account} />
                <Spacer w={2} inline />
              </Grid>
              <Grid>
                <Button auto onClick={disconnect}>
                  Change
                </Button>
              </Grid>
            </Grid.Container>
          </Modal.Content>
        </Body>
      </Modal>
    </Wrapper>
  )
}

export default observer(ConnectButton)
