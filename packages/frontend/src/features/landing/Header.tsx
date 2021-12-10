import { Button, Spacer } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useState, FC } from 'react'
import styled, { css } from 'styled-components'
import Heading from '../../components/Heading'
import SEO from '../../components/SEO'
import { useRootStore } from '../../context/RootStoreProvider'
import { pixelSizes } from '../../theme/breakpoints'
import { spacingIncrement } from '../../theme/utils'
import CreateBucketModal from '../bucket-crud/CreateBucketModal'

const Container = styled.header`
  overflow: hidden;
  position: relative;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 760px;
  position: relative;
  text-align: center;
  z-index: 2;

  p {
    font-size: 22px;
  }

  h1 {
    margin: 0;
    font-size: 74px;
    padding-top: 120px;
    padding-bottom: 120px;
  }

  h3 {
    font-size: 42px;
  }

  @media (max-width: ${pixelSizes.tablet}) {
    p {
      font-size: 20px;
    }

    h1 {
      font-size: 40px;
      padding-top: 60px;
      padding-bottom: 60px;
    }

    h3 {
      font-size: 32px;
    }
  }
`

const Gradient = styled.div`
  height: 589px;
  left: 30%;
  position: absolute;
  top: -159px;
  width: 739px;

  @media (max-width: ${pixelSizes.tablet}) {
    left: -10%;
  }

  div:nth-child(1) {
    background: radial-gradient(
      50% 50% at 50% 50%,
      #f69ee2 0%,
      rgba(195, 107, 238, 0.75) 34.9%,
      rgba(195, 107, 238, 0) 100%
    );
    height: 415.44px;
    position: absolute;
    top: 108px;

    width: 311.05px;
  }

  div:nth-child(2) {
    background: radial-gradient(
      50% 50% at 50% 50%,
      #a59ef6 0%,
      rgba(141, 107, 238, 0.75) 34.9%,
      rgba(125, 107, 238, 0) 100%
    );
    height: 533.9px;
    position: absolute;
    top: -35px;

    transform: rotate(45deg);
    width: 459.39px;
  }
  div:nth-child(3) {
    background: radial-gradient(
      50% 50% at 50% 50%,
      #f69ea3 0%,
      rgba(238, 107, 154, 0.75) 34.9%,
      rgba(238, 107, 154, 0) 100%
    );
    height: 605.79px;
    left: 136px;
    position: absolute;

    transform: matrix(0.8, -0.72, 0.52, 0.78, 0, 0);
    width: 149.09px;
  }
`

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

const Header: FC = () => {
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
    <Container>
      <Gradient>
        <div />
        <div />
        <div />
      </Gradient>

      <SEO
        title="Contrib. | Get a clear overview of tasks and token flows in your DAO"
        description="DAO contribution and experience, validated on-chain"
      />
      <Content>
        <Heading type="h1">Contrib.</Heading>

        <h3>Get a clear overview of tasks and token flows in your DAO</h3>

        <p>DAO contribution and experience, validated on-chain</p>

        <CallToAction onClick={onClick} loading={contribBucketFactoryContractStore.creatingBucket}>
          {label}
        </CallToAction>
        <CreateBucketModal visible={visible} onClose={() => setVisible(false)} />
      </Content>
    </Container>
  )
}

export default observer(Header)
