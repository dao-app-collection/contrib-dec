import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { TaskEntity } from '../../stores/entities/Task.entity'

const Container = styled.div`
  background-color: ${(props) => props.theme.bg.placeholder};
  margin-bottom: 12px;
  padding: 12px;
`

type Props = {
  task: TaskEntity
  openTask: () => void
}

const TaskListItem: FC<Props> = ({ task, openTask }) => {
  return <Container onClick={() => openTask()}>id: {task.id}</Container>
}

export default TaskListItem
