import styled from 'styled-components'
import { TaskEntity } from '../../../stores/entities/Task.entity'
import { spacingIncrement } from '../../../theme/utils'
import { getShortAccount } from '../../../utils/account-utils'
import Identicon from '../../connect/Identicon'

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

type TaskApplicantProps = {
  account: string
}

const TaskApplicant: React.FC<TaskApplicantProps> = ({ account }) => {
  return (
    <Wrapper>
      <Identicon account={account} diameter={40} />
      <Account>{getShortAccount(account)}</Account>
    </Wrapper>
  )
}

type Props = {
  task: TaskEntity | null
}

const TaskApplicants: React.FC<Props> = ({ task }) => {
  if (!task) {
    return null
  }

  if (!task.data?.applications || task.data?.applications?.length === 0) {
    return <div>No applicants yet.</div>
  }
  return (
    <div>
      {task.data?.applications?.map((applicant) => (
        <TaskApplicant key={applicant} account={applicant} />
      ))}
    </div>
  )
}

export default TaskApplicants
