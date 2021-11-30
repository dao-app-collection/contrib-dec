import { FC } from 'react'
import styled from 'styled-components'

type Colors = {
  primary: string
  inverted: string
}

const Container = styled.div<{ colors: Colors }>`
  :root {
    --dao-inverted-color: ${(props) => props.colors.inverted};
    --dao-primary-color: ${(props) => props.colors.primary};
  }

  background-color: ${(props) => props.colors.primary};
  height: 100%;
`

type Props = {
  colors: {
    primary: string
    inverted: string
  }
}

const DAOLayout: FC<Props> = ({ children, colors }) => {
  return <Container colors={colors}>{children}</Container>
}

export default DAOLayout
