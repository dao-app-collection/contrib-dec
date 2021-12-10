import styled from 'styled-components'
import { spacingIncrement } from '../../../theme/utils'
import { getShortAccount } from '../../../utils/account-utils'
import Identicon from '../../connect/Identicon'

const APPLICANTS_MOCK = [
  '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
]

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

const TaskApplicants: React.FC = () => {
  return (
    <div>
      {APPLICANTS_MOCK.map((applicant) => (
        <TaskApplicant key={applicant} account={applicant} />
      ))}
    </div>
  )
}

export default TaskApplicants
