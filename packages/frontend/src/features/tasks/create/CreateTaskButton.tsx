import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import CreateTaskModal from './CreateTaskModal'
import Button from '../../../components/Button'
import { useDao } from '../../../context/DaoContext'
import { BucketEntity } from '../../../stores/entities/Bucket.entity'
import useCreateTask from '../../../hooks/useCreateTask'

type Props = {
  selectedBucket?: BucketEntity
}

const CreateTaskButton: React.FC<Props> = () => {
  const { selectedBucket } = useDao()
  const { canCreateTask } = useCreateTask({ selectedBucket })
  const [visible, setVisible] = useState(true)

  if (!selectedBucket || !canCreateTask) {
    return null
  }

  const onClick = () => {
    setVisible(true)
  }

  return (
    <>
      <Button onClick={onClick} width="100%" modifier="dao" loading={selectedBucket.creatingTask}>
        Create task
      </Button>
      <CreateTaskModal
        visible={visible}
        onClose={() => setVisible(false)}
        selectedBucket={selectedBucket}
      />
    </>
  )
}

export default observer(CreateTaskButton)
