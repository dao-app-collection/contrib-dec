import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { Spacer } from '@geist-ui/react'
import Link from 'next/link'
import ToggleTheme from './ToggleTheme'
import ConnectButton from '../features/connect/ConnectButton'
import { Z_INDEX } from '../utils/general-settings'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
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
      <div>
        <ConnectButton />
      </div>

      {/* <ToggleTheme />
      <Spacer w={1} inline /> */}
    </Wrapper>
  )
}

export default Header
