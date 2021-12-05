import * as React from 'react'
import { FC, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { ResponsiveCirclePackingHtml } from '@nivo/circle-packing'

import CircleComponent from './CircleComponent'
import { useDao } from '../../../context/DaoContext'
import { BucketEntity } from '../../../stores/entities/Bucket.entity'
import { pixelSizes } from '../../../theme/breakpoints'

const Container = styled.div`
  background-color: #321c6f;
  height: 100vh;
  left: 420px;
  position: fixed;
  right: 0;
  top: 0;

  @media (max-width: ${pixelSizes.tablet}) {
    left: 0;
  }
`

type DataItem = {
  name: string
  color: string
  children: DataItem[]
  loc: number
  gotChildren: boolean
  entity: BucketEntity
}

const createChild = (b: BucketEntity, maxLevel: number): DataItem => {
  return {
    name: b.name,
    children: b.children.map((c) => createChild(c, maxLevel)) || [],
    color: '',
    gotChildren: Boolean(b.children.length),
    entity: b,
    loc: b.allocation,
  }
}

const BucketCanvas: FC = () => {
  const { buckets, selectedBucket, navigateTo } = useDao()
  const [zoomedId, setZoomedId] = useState<string | null>(null)
  const [currentDepth, setDepth] = useState(0)

  useEffect(() => {
    if (selectedBucket && selectedBucket.id !== zoomedId) {
      setZoomedId(selectedBucket.name)
      setDepth(selectedBucket.level - 1)
    }
  }, [selectedBucket])

  if (buckets.length === 0) {
    return null
  }

  const maxLevel = Math.max(...buckets.map((bucket) => bucket.level))

  const data = createChild(buckets[0], maxLevel)

  const extraProps = {
    currentDepth,
    zoomedId,
    maxLevel,
  }
  return (
    <Container>
      <ResponsiveCirclePackingHtml
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        id="name"
        value="loc"
        enableLabels={false}
        padding={32}
        labelsFilter={(e) => e.node.depth === currentDepth + 1}
        tooltip={() => null as any}
        borderWidth={0}
        zoomedId={zoomedId}
        motionConfig="slow"
        circleComponent={CircleComponent(extraProps)}
        onClick={(node) => {
          if (node.depth === currentDepth) {
            return
          }

          const id = zoomedId === node.id ? null : node.id
          setZoomedId(id)
          setDepth(id ? node.depth : 0)

          if (id) {
            const bucket = buckets.find((b) => b.name === id)

            if (bucket) {
              navigateTo(bucket)
            }
          } else {
            navigateTo(buckets[0])
          }
        }}
      />
    </Container>
  )
}

export default observer(BucketCanvas)
