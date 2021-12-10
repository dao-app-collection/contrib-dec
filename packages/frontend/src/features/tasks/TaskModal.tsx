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

type Props = {
  //   visible: boolean
  onClose: () => void
  task: TaskEntity | null
}

export type TabId = 'overview' | 'applicants' | 'history'

const Inner = styled.div`
  margin: ${({ theme }) => theme.gap(2)};
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
    <Modal visible={visible} onClose={onClose} width="65%">
      <Modal.Title>{task?.data?.title}</Modal.Title>
      {task?.id && <Modal.Subtitle>id: {task?.id}</Modal.Subtitle>}
      <Modal.Content>
        <p>{task?.data?.description}</p>
      </Modal.Content>
      <Tabs onChange={setActiveTab} selected={activeTab} tabs={tabs} />
      <Inner>{tabList[activeTab]}</Inner>
      <Modal.Action passive onClick={onClose}>
        Cancel
      </Modal.Action>
      <Modal.Action disabled>Submit</Modal.Action>
    </Modal>
  )
}

export default observer(TaskModal)
