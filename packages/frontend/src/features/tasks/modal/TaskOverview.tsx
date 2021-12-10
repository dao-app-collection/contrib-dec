import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Grid } from '@geist-ui/react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import useResponsive from '../../../hooks/useResponsive'
import { TaskEntity } from '../../../stores/entities/Task.entity'
import { spacingIncrement } from '../../../theme/utils'
import TaskTableItem from '../TaskTableItem'
import { capitalizeFirstLetter } from '../../../utils/string-utils'

type Props = {
  task: TaskEntity
}

dayjs.extend(relativeTime)

const Wrapper = styled.div``

const Section = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 600;
  margin-bottom: ${spacingIncrement(12)};
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  margin: 0;
`

const TaskOverview: React.FC<Props> = ({ task }) => {
  const { isDesktop } = useResponsive()

  if (!task) return null

  return (
    <Wrapper>
      <Section>
        <Title>Properties</Title>
        <Grid.Container gap={1} justify="space-between" height="auto">
          <Grid xs={11} md={5}>
            <TaskTableItem label="Time left" loading={!task.data?.deadlineTimestamp}>
              {task.data?.deadlineTimestamp &&
                dayjs().from(dayjs(new Date(task.data?.deadlineTimestamp)), true)}
            </TaskTableItem>
          </Grid>
          <Grid xs={11} md={5}>
            <TaskTableItem label="Opened" loading={!task.data?.deadlineTimestamp}>
              {task.data?.createdTimestamp &&
                dayjs(new Date(task.data?.createdTimestamp)).fromNow()}
            </TaskTableItem>
          </Grid>
          <Grid xs={11} md={5}>
            <TaskTableItem label="Issue type">Improvement</TaskTableItem>
          </Grid>
          <Grid xs={11} md={5}>
            <TaskTableItem label="Time commitment">Hours</TaskTableItem>
          </Grid>
        </Grid.Container>
        <Grid.Container
          gap={1}
          justify="space-between"
          height="100px"
          marginTop={1}
          marginBottom={isDesktop ? 0 : 2}
        >
          <Grid xs={11} md={5}>
            <TaskTableItem label="Experience level" loading={!task.data?.experienceLevel}>
              {capitalizeFirstLetter(task.data?.experienceLevel)}
            </TaskTableItem>
          </Grid>
          <Grid xs={11} md={5}>
            <TaskTableItem label="Project type">Traditional</TaskTableItem>
          </Grid>
          <Grid xs={11} md={5}>
            <TaskTableItem label="Permissions">Approval</TaskTableItem>
          </Grid>
          <Grid xs={11} md={5}>
            <TaskTableItem label="Submitted by">jontdoxx</TaskTableItem>
          </Grid>
        </Grid.Container>
      </Section>
      <Section>
        <Title>Description</Title>
        <Description>
          <ReactMarkdown>{task.data?.body || ''}</ReactMarkdown>
        </Description>
      </Section>
    </Wrapper>
  )
}

export default TaskOverview
