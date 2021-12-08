import * as React from 'react'
import { FC } from 'react'
import { Loading } from '@geist-ui/react'
import styled from 'styled-components'

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`

const PageLoader: FC = () => {
  return (
    <Container>
      <Loading />
    </Container>
  )
}

export default PageLoader
