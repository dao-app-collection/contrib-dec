import * as React from 'react'
import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import TaskListItem from './TaskListItem'
import useTasks from '../../hooks/useTasksFromBucket'

const TaskList: FC = () => {
  const tasks = useTasks()

  return (
    <div>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </div>
  )
}

export default observer(TaskList)
