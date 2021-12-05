import * as React from 'react'
import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Spacer } from '@geist-ui/react'
import TaskListItem from './TaskListItem'
import TaskModal from './TaskModal'
import CreateTaskButton from './create/CreateTaskButton'
import useTasks from '../../hooks/useTasksFromBucket'
import { useDao } from '../../context/DaoContext'

const Container = styled.div``

const TaskList: FC = () => {
  const tasks = useTasks()
  const { openTask, currentTask } = useDao()

  return (
    <Container>
      <CreateTaskButton />
      <Spacer h={1} />
      {tasks.map((task) => (
        <TaskListItem openTask={() => openTask(task)} key={task.id} task={task} />
      ))}

      <TaskModal task={currentTask} onClose={() => openTask()} />
    </Container>
  )
}

export default observer(TaskList)
