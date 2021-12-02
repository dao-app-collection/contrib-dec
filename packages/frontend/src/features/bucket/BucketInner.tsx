import * as React from 'react'
import { FC, useState } from 'react'
import styled from 'styled-components'
import { Spacer } from '@geist-ui/react'
import BucketNav from './BucketNav'
import Tabs from '../../components/Tabs'
import TaskList from '../tasks/TaskList'
import useSelectedBucket from '../../hooks/useSelectedBucket'

const Top = styled.div`
  background-color: ${(props) => props.theme.bg.secondary};
  margin-bottom: -4px;
  padding: ${(props) => props.theme.gap(4)};
  padding-bottom: 0;
`

const Inner = styled.div`
  margin: ${(props) => props.theme.gap(2)};
`

const BucketInner: FC = () => {
  const [activeTab, setActiveTab] = useState('tasks')
  const selected = useSelectedBucket()

  if (!selected) {
    return null
  }

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
      <Top>
        <BucketNav />
        <Spacer h={2} />
        <Tabs onChange={setActiveTab} selected={activeTab} tabs={tabs} />
      </Top>
      <Inner>{activeTab === 'tasks' && <TaskList />}</Inner>
    </>
  )
}

export default BucketInner
