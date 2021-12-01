import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { Spacer } from '@geist-ui/react'
import ToggleTheme from './ToggleTheme'
import ConnectButton from '../features/connect/ConnectButton'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`

const Header: FC = () => {
  return (
    <Wrapper>
      <ConnectButton />
      <Spacer w={1} inline />
      <ToggleTheme />
      <Spacer w={1} inline />
    </Wrapper>
  )
}

export default Header
