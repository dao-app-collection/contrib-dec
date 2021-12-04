import * as React from 'react'
import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import TaskListItem from './TaskListItem'
import TaskModal from './TaskModal'
import useTasks from '../../hooks/useTasksFromBucket'
import { useDao } from '../../context/DaoContext'

const Container = styled.div`
  min-height: 2000px;
`

const TaskList: FC = () => {
  const tasks = useTasks()
  const { openTask, currentTask } = useDao()

  return (
    <Container>
      {tasks.map((task) => (
        <TaskListItem openTask={() => openTask(task)} key={task.id} task={task} />
      ))}

      <TaskModal task={currentTask} onClose={() => openTask(null)} />
    </Container>
  )
}

export default observer(TaskList)
