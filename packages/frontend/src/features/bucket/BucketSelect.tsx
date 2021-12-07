import { Select } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import { useRootStore } from '../../context/RootStoreProvider'
import useSelectedBucket from '../../hooks/useSelectedBucket'

const Container = styled.div`
  margin: ${(props) => props.theme.gap(2)};
`

const BucketSelect: FC = () => {
  const rootStore = useRootStore()
  const buckets = rootStore.bucketStore.buckets || []
  const router = useRouter()
  const selectedBucket = useSelectedBucket()

  return (
    <Container>
      <Select
        width="100%"
        placeholder="Buckets"
        value={selectedBucket?.url}
        onChange={(value) => {
          router.push(value as string)
        }}
      >
        {buckets.map((bucket) => (
          <Select.Option key={bucket.url} value={bucket.url}>
            {bucket.url}
          </Select.Option>
        ))}
      </Select>
    </Container>
  )
}

export default observer(BucketSelect)
