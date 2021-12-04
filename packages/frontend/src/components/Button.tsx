import { Button as GeistButton, ButtonProps } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import styled, { css } from 'styled-components'

const StyledButton = styled(GeistButton)<{ modifier?: 'dao' }>`
  ${(props) =>
    props.modifier === 'dao' &&
    css`
      &&& {
        background-color: ${(props) => props.theme.dao.primary};
        color: ${(props) => props.theme.dao.inverted};
      }
    `}
`

type Props = ButtonProps & {
  modifier?: 'dao'
}

const Button: FC<Props> = ({ children, modifier }) => {
  return <StyledButton modifier={modifier}>{children}</StyledButton>
}

export default Button
