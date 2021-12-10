import styled from 'styled-components'
import { spacingIncrement } from '../../theme/utils'
import { getShortAccount } from '../../utils/account-utils'
import Identicon from '../connect/Identicon'

const Wrapper = styled.div`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.contrib.borderColor};
  display: flex;
  padding: ${spacingIncrement(20)} 0;

  &:last-child {
    border: none;
    padding-bottom: 0;
  }
`

const Account = styled.div`
  color: ${({ theme }) => theme.contrib.accent};
  font-weight: 600;
  margin-left: ${spacingIncrement(20)};
`

type Props = {
  account: string
}

const TaskApplicant: React.FC<Props> = ({ account }) => {
  return (
    <Wrapper>
      <Identicon account={account} diameter={40} />
      <Account>{getShortAccount(account)}</Account>
    </Wrapper>
  )
}

export default TaskApplicant
