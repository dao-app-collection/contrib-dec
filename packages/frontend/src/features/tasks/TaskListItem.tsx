import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { TaskEntity } from '../../stores/entities/Task.entity'

const Container = styled.div`
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

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.base};
`

type Props = {
  task: TaskEntity
  openTask: () => void
}

const TaskListItem: FC<Props> = ({ task, openTask }) => {
  return (
    <Container onClick={() => openTask()}>
      <Title>{task.data?.title}</Title>
    </Container>
  )
}

export default TaskListItem
