import { Button } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import TaskApplicants from './modal/TaskApplicants'
import TaskHistory from './modal/TaskHistory'
import TaskOverview from './modal/TaskOverview'
import TaskStatusLabel from './TaskStatusLabel'
import TaskEdit from './TaskEdit'
import { TaskEntity } from '../../stores/entities/Task.entity'
import Tabs from '../../components/Tabs'
import { spacingIncrement } from '../../theme/utils'
import { media } from '../../theme/media'
import useResponsive from '../../hooks/useResponsive'
import useIsBucketOwner from '../../hooks/useIsBucketOwner'
import useSelectedBucket from '../../hooks/useSelectedBucket'
import Modal from '../../components/Modal'

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

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${spacingIncrement(20)} 0;
`

const TopSection = styled.div<{ alignItems: 'flex-start' | 'flex-end' }>`
  align-items: ${({ alignItems }) => alignItems};
  display: flex;
  flex-direction: column;
`

const TaskCategory = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  margin-left: ${spacingIncrement(10)};
`

const TaskTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 400;
`

const TaskMetadata = styled.h2`
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;

  span {
    color: ${({ theme }) => theme.bg.placeholder};
    font-weight: 400;
    margin-left: ${spacingIncrement(10)};
  }

  ${media.phone`
    flex-direction: column;
    justify-content: flex-start;
    span {
      margin-left: 0;
    }
  `}
`

const Title = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`

const Inner = styled.div`
  background: ${({ theme }) => theme.bg.primary};
  padding: ${spacingIncrement(24)};
`

const TaskModal: FC<Props> = ({ onClose, task }) => {
  const [visible, setVisble] = useState(false)
  const { isDesktop } = useResponsive()
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const selectedBucket = useSelectedBucket()
  const isOwner = useIsBucketOwner(selectedBucket)

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

  if (isOwner) {
    tabs.push({
      id: 'edit',
      text: 'Edit',
    })
  }

  useEffect(() => {
    if (task) {
      setVisble(true)
    } else {
      setTimeout(() => {
        setActiveTab('overview')
        setVisble(false)
      }, 500)
    }
  }, [task])

  const tabList = {
    edit: task && <TaskEdit task={task} />,
    overview: task && <TaskOverview task={task} />,
    applicants: <TaskApplicants />,
    history: <TaskHistory />,
  }

  return (
    <Modal
      disableBackdropClick
      visible={visible}
      onClose={onClose}
      width={isDesktop ? '50%' : '100%'}
      padding="0"
    >
      <Top>
        <Title>
          <TaskStatusLabel status="open" size="large" />
          <TaskCategory>Core tech</TaskCategory>
        </Title>
        <TopContainer>
          <TopSection alignItems="flex-start">
            <TaskTitle>{task?.data?.title}</TaskTitle>
            <TaskMetadata>
              <div>500 DDAO</div>
              <span>Intermediate · Frontend</span>
            </TaskMetadata>
          </TopSection>
          <TopSection alignItems="flex-end">
            <Button>Apply for task</Button>
            <span>Share link</span>
          </TopSection>
        </TopContainer>

        <Tabs onChange={setActiveTab} selected={activeTab} tabs={tabs} />
      </Top>

      <Inner>{tabList[activeTab]}</Inner>
    </Modal>
  )
}

export default observer(TaskModal)
