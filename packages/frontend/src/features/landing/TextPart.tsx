import { Grid, Spacer } from '@geist-ui/react'
import * as React from 'react'
import { ReactNode, FC } from 'react'
import styled from 'styled-components'
import { pixelSizes } from '../../theme/breakpoints'

const Container = styled.div`
  p {
    font-size: 24px;
  }

  h1 {
    font-size: 66px;
  }

  @media (max-width: ${pixelSizes.tablet}) {
    p {
      font-size: 20px;
    }

    h1 {
      font-size: 40px;
    }

    h3 {
      font-size: 32px;
    }
  }
`

const Title = styled.h1`
  font-size: 66px;
`
const Desc = styled.div``

type Props = {
  title: string
  children: ReactNode
}

const TextPart: FC<Props> = ({ title, children }) => {
  return (
    <Container>
      <Spacer h={3} />

      <Grid.Container gap={2}>
        <Grid xs={24} md={6}>
          <Title>{title}</Title>
        </Grid>
        <Grid xs={0} md={4} />
        <Grid xs={24} md={12}>
          <Desc>{children}</Desc>
        </Grid>
      </Grid.Container>

      <Spacer h={3} />
    </Container>
  )
}

export default TextPart
