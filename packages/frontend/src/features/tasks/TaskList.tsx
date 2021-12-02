import * as React from 'react'
import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import TaskListItem from './TaskListItem'
import useTasks from '../../hooks/useTasksFromBucket'

const Container = styled.div`
  min-height: 2000px;
`

const TaskList: FC = () => {
  const tasks = useTasks()

  return (
    <Container>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </Container>
  )
}

export default observer(TaskList)
