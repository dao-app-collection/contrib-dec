import { Grid } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div``

const Features: FC = () => {
  return (
    <Container>
      <Grid.Container>
        <Grid />
      </Grid.Container>
    </Container>
  )
}

export default Features
