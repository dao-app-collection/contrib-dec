import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Tag } from '@geist-ui/react'
import { TaskEntity } from '../../../stores/entities/Task.entity'
import { spacingIncrement } from '../../../theme/utils'
import { getShortAccount } from '../../../utils/account-utils'
import Identicon from '../../connect/Identicon'
import Button from '../../../components/Button'

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
  margin-right: auto;
`

type TaskApplicantProps = {
  account: string
  canApprove: boolean
  loading: boolean
  asssigned: boolean
  onClick: () => void
}

const TaskApplicant: React.FC<TaskApplicantProps> = ({
  account,
  canApprove,
  loading,
  onClick,
  asssigned,
}) => {
  return (
    <Wrapper>
      <Identicon account={account} diameter={40} />
      <Account>{getShortAccount(account)}</Account>
      {asssigned && <Tag type="lite">Assigned</Tag>}
      {canApprove && (
        <Button loading={loading} onClick={onClick} modifier="dao">
          Approve
        </Button>
      )}
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
        <TaskApplicant
          key={applicant}
          account={applicant}
          loading={task.status === 'isApproving'}
          canApprove={task.canApprove}
          onClick={() => task.approve(applicant)}
          asssigned={task.data?.assignes.includes(applicant) || false}
        />
      ))}
    </div>
  )
}

export default observer(TaskApplicants)
