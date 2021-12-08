import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import CreateTaskModal from './CreateTaskModal'
import Button from '../../../components/Button'
import { useDao } from '../../../context/DaoContext'
import { BucketEntity } from '../../../stores/entities/Bucket.entity'

type Props = {
  selectedBucket?: BucketEntity
}

const CreateTaskButton: React.FC<Props> = () => {
  const { selectedBucket } = useDao()
  const [visible, setVisible] = useState(false)

  if (!selectedBucket) {
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
