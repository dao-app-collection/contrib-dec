import ReactMarkdown from 'react-markdown'
import { TaskEntity } from '../../../stores/entities/Task.entity'

type Props = {
  task: TaskEntity
}

const TaskOverview: React.FC<Props> = ({ task }) => {
  return (
    <div>
      <h1>Task Overview</h1>
      <div>
        <ReactMarkdown>{task.data?.body || ''}</ReactMarkdown>
      </div>
    </div>
  )
}

export default TaskOverview
