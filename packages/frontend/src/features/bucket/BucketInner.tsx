import * as React from 'react'
import { FC, useState } from 'react'
import styled from 'styled-components'
import { Spacer } from '@geist-ui/react'
import BucketNav from './BucketNav'
import Tabs from '../../components/Tabs'
import TaskList from '../tasks/TaskList'
import useSelectedBucket from '../../hooks/useSelectedBucket'
import Overview from '../overview/Overview'

const Top = styled.div`
  background-color: ${(props) => props.theme.bg.secondary};
  margin-bottom: -4px;
  padding: ${(props) => props.theme.gap(4)};
  padding-bottom: 0;
`

const Inner = styled.div`
  margin: ${(props) => props.theme.gap(2)};
`

export type TabId = 'overview' | 'tasks' | 'members' | 'suggestions'

const BucketInner: FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('tasks')
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

  const tabList = {
    overview: <Overview />,
    tasks: <TaskList />,
    members: <div>Members</div>,
    suggestions: <div>Suggestions</div>,
  }

  return (
    <>
      <Top>
        <BucketNav />
        <Spacer h={2} />
        <Tabs onChange={setActiveTab} selected={activeTab} tabs={tabs} />
      </Top>
      <Inner>{tabList[activeTab]}</Inner>
    </>
  )
}

export default BucketInner
