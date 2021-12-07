import { Loading, Text } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import useIsBucketOwner from '../../hooks/useIsBucketOwner'
import useSelectedBucket from '../../hooks/useSelectedBucket'
import useUpdateBucket from '../../hooks/useUpdateBucket'
import FundBucket from '../bucket/FundBucket'
import CreateSubBucketButton from '../create-bucket/CreateSubBucketButton'

const Overview: React.FC = () => {
  const selectedBucket = useSelectedBucket()
  const { updateBucket, isUpdating } = useUpdateBucket({ bucket: selectedBucket })
  const isBucketOwner = useIsBucketOwner(selectedBucket)
  const [newDesc, setDesc] = useState('')

  useEffect(() => {
    setDesc(selectedBucket?.data.description || '')
  }, [selectedBucket?.data.description])

  if (!selectedBucket) {
    return null
  }

  const handleBlur = () => {
    if (selectedBucket.data.description !== newDesc) {
      updateBucket({
        title: selectedBucket.name,
        description: newDesc,
      })
    }
  }

  return (
    <div>
      <CreateSubBucketButton />
      {isUpdating && <Loading />}
      <Text
        p
        contentEditable={!isUpdating && isBucketOwner}
        onInput={(e) => setDesc(e.currentTarget.textContent)}
        onBlur={handleBlur}
      >
        {selectedBucket?.data.description}
      </Text>
      <Text p>
        Allocation: {selectedBucket?.allocation?.toString()} {selectedBucket.token.symbol()}
      </Text>
      <FundBucket />
    </div>
  )
}

export default observer(Overview)
