import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { TaskEntity } from '../../stores/entities/Task.entity'
import { primaryFontFamily } from '../../theme/general-settings'
import { spacingIncrement } from '../../theme/utils'

const Wrapper = styled.div`
  ${primaryFontFamily};
  background-color: ${(props) => props.theme.bg.card};
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 12px;
  padding: 12px;

  :hover {
    -webkit-transition: box-shadow 0.2s ease-in;
    box-shadow: 1px 2px 10px grey;
  }
`

const Top = styled.div``

const Bottom = styled.div`
  color: ${(props) => props.theme.bg.placeholder};
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: 400;
  margin-top: ${spacingIncrement(10)};
`

const Section = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: 700;
`

const Description = styled.div`
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: 400;
`

const Amount = styled.div`
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: 600;
`

type Props = {
  task: TaskEntity
  openTask: () => void
}

type TaskStatusLabelProps = {
  status: 'open' | 'claimed' | 'completed'
}

const StatusLabel = styled.div<TaskStatusLabelProps>`
  background: ${({ theme, status }) => theme.taskStatus[status]};
  border-radius: 8px;
  color: ${({ theme, status }) => theme.taskStatusText[status]};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  height: 20px;
  line-height: 1rem;
  padding: ${spacingIncrement(1)} ${spacingIncrement(8)};
  text-transform: uppercase;
`

const TaskStatusLabel: FC<TaskStatusLabelProps> = ({ status }) => {
  return <StatusLabel status={status}>Open</StatusLabel>
}

const TaskListItem: FC<Props> = ({ task, openTask }) => {
  return (
    <Wrapper onClick={() => openTask()}>
      <Top>
        <Section>
          <Title>{task.data?.title}</Title>
          <TaskStatusLabel status="open" />
        </Section>
        <Section>
          <Description>Design</Description>
          <Amount>500 DDAO</Amount>
        </Section>
      </Top>
      <Bottom>Intermediate · Frontend</Bottom>
    </Wrapper>
  )
}

export default TaskListItem
