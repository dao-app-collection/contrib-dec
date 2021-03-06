import { FC } from 'react'
import styled from 'styled-components'
import { spacingIncrement } from '../../theme/utils'
import { TaskStatus } from '../../types/all-types'

type TaskStatusLabelProps = {
  status?: TaskStatus
  size?: 'small' | 'large'
}

const StatusLabel = styled.div<TaskStatusLabelProps>`
  background: ${({ theme, status }) => theme.taskStatus[status]};
  border-radius: 8px;
  color: ${({ theme, status }) => theme.taskStatusText[status]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  /* height: ${({ size }) => (size === 'small' ? '20px' : '30px')};
  line-height: ${({ size }) => (size === 'small' ? '1rem' : '1.6rem')};
  padding: ${spacingIncrement(1)} ${spacingIncrement(8)}; */
  text-transform: uppercase;

  ${({ size }) => {
    if (size === 'large') {
      return `
        height: 30px;
        line-height: 1.6rem;
        padding: ${spacingIncrement(2)} ${spacingIncrement(20)};
      `
    }
    return `
        height: 20px;
        line-height: 1rem;
        padding: ${spacingIncrement(1)} ${spacingIncrement(8)};
      `
  }}
`

const TaskStatusLabel: FC<TaskStatusLabelProps> = ({ status, size }) => {
  if (!status) {
    return null
  }
  return (
    <StatusLabel status={status} size={size}>
      {status}
    </StatusLabel>
  )
}

export default TaskStatusLabel
