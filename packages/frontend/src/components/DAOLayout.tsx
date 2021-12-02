import { FC } from 'react'
import styled from 'styled-components'

type Colors = {
  primary: string
  inverted: string
  accent: string
}

const Container = styled.div<{ colors: Colors }>`
  --dao-accent-color: ${(props) => props.colors.accent};
  --dao-inverted-color: ${(props) => props.colors.inverted};
  --dao-primary-color: ${(props) => props.colors.primary};

  background-color: ${(props) => props.colors.primary};
  height: 90%;
`

type Props = {
  colors: Colors
}

const DAOLayout: FC<Props> = ({ children, colors }) => {
  return <Container colors={colors}>{children}</Container>
}

export default DAOLayout
