import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import { ResponsiveTreeMap } from '@nivo/treemap'
import styled from 'styled-components'
import { Loading, Page, Spacer, Tree } from '@geist-ui/react'
import { useRouter } from 'next/dist/client/router'
import { useRootStore } from '../../context/RootStoreProvider'
import { BucketEntity } from '../../stores/entities/Bucket.entity'

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 300px;
  justify-content: center;
  width: 100%;
`
const AvailableBuckets: FC = () => {
  const store = useRootStore()
  // eslint-disable-next-line prefer-destructuring
  const buckets = store.bucketStore.buckets
  const router = useRouter()

  if (buckets.length === 0) {
    return (
      <Container>
        <Loading />
      </Container>
    )
  }

  const createChild = (b: BucketEntity): any => ({
    name: b.name,
    children: b.children.map((c) => createChild(c)) || [],
    allocation: b.allocation,
    color: '#7B4BFF',
    url: b.url,
    slug: b.slug,
  })

  const data = {
    name: 'Contrib',
    children: buckets.filter((bucket) => bucket.level === 1).map(createChild),
  }

  const renderFile = (bucket: BucketEntity) =>
    bucket.children.length ? (
      <Tree.Folder key={bucket.id} name={bucket.name}>
        {bucket.children.map(renderFile)}
      </Tree.Folder>
    ) : (
      <Tree.File key={bucket.id} name={bucket.name} onClick={() => router.push(bucket.url)} />
    )
  return (
    <div>
      <Spacer h={2} />

      <Tree>{data.children.map(renderFile)}</Tree>
      <Spacer h={2} />
    </div>
  )
}

export default observer(AvailableBuckets)
