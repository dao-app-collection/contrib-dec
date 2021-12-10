import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { Spacer } from '@geist-ui/react'
import Link from 'next/link'
import ConnectButton from '../features/connect/ConnectButton'
import { Z_INDEX } from '../utils/general-settings'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding: ${(props) => props.theme.gap(2)};
  position: fixed;
  right: 0;
  width: 100%;
  z-index: ${Z_INDEX.header};
`

const Logo = styled.div`
  a {
    color: white;
    font-size: 30px;
    font-weight: bold;
  }
`

const Header: FC = () => {
  return (
    <Wrapper>
      <Logo>
        <Link href="/">
          <a href="/">Contrib.</a>
        </Link>
      </Logo>
      <Spacer w={2} inline />
      <div>
        <ConnectButton />
      </div>
    </Wrapper>
  )
}

export default Header
