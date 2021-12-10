import MDEditor from '@uiw/react-md-editor'
import { TaskEntity } from '../../../stores/entities/Task.entity'

type Props = {
  task: TaskEntity
}

const TaskOverview: React.FC<Props> = ({ task }) => {
  return (
    <div>
      <h1>Task Overview</h1>
      <div>
        <MDEditor.Markdown source={task.data?.body || ''} />
      </div>
    </div>
  )
}

export default TaskOverview
