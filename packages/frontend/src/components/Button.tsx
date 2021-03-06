import { Button as GeistButton, ButtonProps } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import styled, { css } from 'styled-components'

const StyledButton = styled(GeistButton)<{ modifier?: 'dao' }>`
  ${({ modifier, theme }) =>
    modifier === 'dao' &&
    css`
      &&& {
        background-color: ${theme.dao.primary};
        color: white;
      }
    `}
`

type Props = ButtonProps & {
  modifier?: 'dao'
}

const Button: FC<Props> = ({ children, modifier, ...props }) => {
  return (
    <StyledButton modifier={modifier} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button
