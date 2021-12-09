import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import UpdateBucketModal from './UpdateBucketModal'
import useSelectedBucket from '../../hooks/useSelectedBucket'
import useIsBucketOwner from '../../hooks/useIsBucketOwner'

const Container = styled.div`
  margin-left: auto;
  min-height: 20px;
  min-width: 20px;

  div {
    cursor: pointer;
  }
`

const BucketEditAction: FC = () => {
  const [visible, setVisible] = useState(false)
  const onClose = () => setVisible(false)
  const selectedBucket = useSelectedBucket()
  const isOwner = useIsBucketOwner()

  useEffect(() => {
    if (!isOwner) {
      setVisible(false)
    }
  }, [isOwner])

  if (!selectedBucket) {
    return null
  }

  return (
    <>
      <Container>
        <div onClick={() => setVisible(true)}>Edit</div>
      </Container>

      <UpdateBucketModal visible={visible} onClose={onClose} />
    </>
  )
}

export default BucketEditAction
