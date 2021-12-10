import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import styled from 'styled-components'
import { spacingIncrement } from '../../../theme/utils'
import { getShortAccount } from '../../../utils/account-utils'

dayjs.extend(relativeTime)

type EventType = 'newApplicant' | 'taskCreated'
type Event = {
  type: EventType
  timestamp: number
  data: string
}

const EVENTS_MOCK: Event[] = [
  {
    type: 'newApplicant',
    timestamp: 1639163851,
    data: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  },
  {
    type: 'newApplicant',
    timestamp: 1639163851,
    data: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  },
  {
    type: 'newApplicant',
    timestamp: 1639163851,
    data: '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
  },
  {
    type: 'taskCreated',
    timestamp: 1639163851,
    data: '0xf6B186049232cd426E18DD068a205d50c398a2D8',
  },
]

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.sm};
  padding: ${spacingIncrement(6)} 0;
`

const Timestamp = styled.div`
  color: ${({ theme }) => theme.bg.placeholder};
  margin-right: ${spacingIncrement(16)};
`

const Label = styled.div`
  span {
    color: ${({ theme }) => theme.contrib.accent};
    font-weight: 600;
  }
`

type Props = {
  type: EventType
  timestamp: number
  data: string
}

const TaskHistoryEvent: React.FC<Props> = ({ type, timestamp, data }) => {
  const label = {
    newApplicant: 'New applicant',
    taskCreated: 'Task created by',
  }

  return (
    <Wrapper>
      <Timestamp>{dayjs().to(dayjs.unix(timestamp))}</Timestamp>
      <Label>
        {label[type]} <span>{getShortAccount(data)}</span>
      </Label>
    </Wrapper>
  )
}

const TaskHistory: React.FC = () => {
  return (
    <div>
      {EVENTS_MOCK.map((event) => {
        return (
          <TaskHistoryEvent
            key={event.timestamp}
            type={event.type}
            timestamp={event.timestamp}
            data={event.data}
          />
        )
      })}
    </div>
  )
}

export default TaskHistory
