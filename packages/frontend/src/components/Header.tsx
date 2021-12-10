import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { Spacer } from '@geist-ui/react'
import ToggleTheme from './ToggleTheme'
import ConnectButton from '../features/connect/ConnectButton'
import { Z_INDEX } from '../utils/general-settings'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 6%;
  justify-content: flex-end;
  position: fixed;
  right: 0;
  z-index: ${Z_INDEX.header};
`

const Header: FC = () => {
  return (
    <Wrapper>
      <ConnectButton />
      <Spacer w={1} inline />
      {/* <ToggleTheme />
      <Spacer w={1} inline /> */}
    </Wrapper>
  )
}

export default Header
