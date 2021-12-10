import { Modal } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC, useState } from 'react'
import styled from 'styled-components'
import TaskApplicants from './modal/TaskApplicants'
import TaskHistory from './modal/TaskHistory'
import TaskOverview from './modal/TaskOverview'
import { TaskEntity } from '../../stores/entities/Task.entity'
import Tabs from '../../components/Tabs'
import { spacingIncrement } from '../../theme/utils'

type Props = {
  //   visible: boolean
  onClose: () => void
  task: TaskEntity | null
}

export type TabId = 'overview' | 'applicants' | 'history'

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: ${spacingIncrement(20)};
  padding-bottom: 0;
  width: 100%;
`

const Inner = styled.div`
  background: ${({ theme }) => theme.bg.primary};
  padding: ${spacingIncrement(24)};
`

const TaskModal: FC<Props> = ({ onClose, task }) => {
  const visible = Boolean(task)
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  const tabs = [
    {
      id: 'overview',
      text: 'Overview',
    },
    {
      id: 'applicants',
      text: 'Applicants',
    },
    {
      id: 'history',
      text: 'History',
    },
  ]

  const tabList = {
    overview: <TaskOverview />,
    applicants: <TaskApplicants />,
    history: <TaskHistory />,
  }

  return (
    <Modal visible={visible} onClose={onClose} width="65%" padding="0">
      <Top>
        {task?.data?.title}
        <Tabs onChange={setActiveTab} selected={activeTab} tabs={tabs} />
      </Top>

      <Inner>{tabList[activeTab]}</Inner>
    </Modal>
  )
}

export default observer(TaskModal)
