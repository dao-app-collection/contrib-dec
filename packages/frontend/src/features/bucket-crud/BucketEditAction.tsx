import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, Popover } from '@geist-ui/react'
import { MoreHorizontal } from '@geist-ui/react-icons'
import UpdateBucketModal from './UpdateBucketModal'
import CreateBucketModal from './CreateBucketModal'
import FundBucketModal from './FundBucketModal'
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
  const [visible, setVisible] = useState<string | null>(null)
  const onClose = () => setVisible(null)
  const selectedBucket = useSelectedBucket()
  const isOwner = useIsBucketOwner()

  useEffect(() => {
    if (!isOwner) {
      setVisible(null)
    }
  }, [isOwner])

  if (!selectedBucket) {
    return null
  }

  const content = () => (
    <>
      <Popover.Item>
        <Link
          href="#"
          onClick={() => {
            setVisible('fund')
          }}
        >
          Fund bucket
        </Link>
      </Popover.Item>
      <Popover.Item line />
      <Popover.Item>
        <Link
          href="#"
          onClick={() => {
            setVisible('update')
          }}
        >
          Update bucket
        </Link>
      </Popover.Item>
      <Popover.Item line />
      <Popover.Item>
        <Link
          href="#"
          onClick={() => {
            setVisible('create')
          }}
        >
          Create sub bucket
        </Link>
      </Popover.Item>
    </>
  )

  return (
    <Container>
      <Popover content={content}>
        <MoreHorizontal />
      </Popover>
      <FundBucketModal
        selectedBucket={selectedBucket}
        visible={visible === 'fund'}
        onClose={onClose}
      />

      <UpdateBucketModal visible={visible === 'update'} onClose={onClose} />

      <CreateBucketModal
        visible={visible === 'create'}
        onClose={onClose}
        selectedBucket={selectedBucket}
      />
    </Container>
  )
}

export default BucketEditAction
