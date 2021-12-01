import * as React from 'react'
import { FC, useState } from 'react'
import Tabs from '../../components/Tabs'
import TaskList from '../tasks/TaskList'

const BucketInner: FC = () => {
  const [activeTab, setActiveTab] = useState('tasks')

  const tabs = [
    {
      id: 'overview',
      text: 'Overview',
    },
    {
      id: 'tasks',
      text: 'Tasks',
    },
    {
      id: 'members',
      text: 'Members',
    },
    {
      id: 'suggestions',
      text: 'Suggestions',
    },
  ]

  return (
    <>
      <Tabs onChange={setActiveTab} selected={activeTab} tabs={tabs} />
      {activeTab === 'tasks' && <TaskList />}
    </>
  )
}

export default BucketInner
