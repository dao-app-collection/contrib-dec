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
    <Page>
      <Container>
        <ResponsiveTreeMap
          data={data}
          identity="name"
          value="allocation"
          tooltip={({ node }) => (
            <strong style={{ color: node.color }}>
              {node.pathComponents.filter((_, i) => i > 0).join(' / ')}: {node.formattedValue} DDAO
            </strong>
          )}
          onClick={(node) => {
            if (node.data.url) {
              router.push(node.data.url)
            }
          }}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          labelSkipSize={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
          parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          colors={{ scheme: 'purple_red' }}
          borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
        />
      </Container>
      <Spacer h={2} />

      <Tree>{data.children.map(renderFile)}</Tree>
      <Spacer h={2} />
    </Page>
  )
}

export default observer(AvailableBuckets)
