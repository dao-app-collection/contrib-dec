import * as React from 'react'
import { FC, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { ResponsiveCirclePackingHtml } from '@nivo/circle-packing'

import { toJS } from 'mobx'
import CircleComponent from './CircleComponent'
import { useDao } from '../../../context/DaoContext'
import { BucketEntity } from '../../../stores/entities/Bucket.entity'
import { pixelSizes } from '../../../theme/breakpoints'

const Container = styled.div`
  background-color: ${(props) => props.theme.dao.primary};
  height: 100vh;
  left: 420px;
  position: fixed;
  right: 0;

  @media (max-width: ${pixelSizes.tablet}) {
    left: 0;
  }
`

type DataItem = {
  name: string
  color: string
  children: DataItem[]
  size: number
  gotChildren: boolean
  isSelected: boolean
  currentDepth: number
  entity: {
    logo?: string
    allocation: number
    tokenSymbol: string
    taskCount: number
  }
}

const BucketCanvas: FC = () => {
  const { buckets, selectedBucket, navigateTo } = useDao()
  const [zoomedId, setZoomedId] = useState<string | null>(null)
  const [currentDepth, setDepth] = useState(0)

  useEffect(() => {
    if (selectedBucket && selectedBucket.id !== zoomedId) {
      setZoomedId(selectedBucket.id)
      setDepth(selectedBucket.level - 1)
    }
  }, [selectedBucket])

  if (buckets.length === 0) {
    return null
  }

  const topLevel = selectedBucket?.topLevel

  if (!topLevel) {
    return null
  }
  const createChild = (b: BucketEntity): DataItem => {
    return toJS({
      id: b.id,
      name: b.name,
      children: b.children.map((c) => createChild(c)) || [],
      color: b.color,
      gotChildren: Boolean(b.children.length),
      size: b.allocation?.toNumber() || 1.2,
      isSelected: b.id === zoomedId,
      currentDepth,
      entity: {
        taskCount: b.tasks.length,
        logo: b.data?.logo,
        allocation: b.allocation?.toNumber() || 0,
        tokenSymbol: b.getSymbol(),
      },
    })
  }

  const data = createChild(topLevel)
  return (
    <Container>
      <ResponsiveCirclePackingHtml
        data={data}
        margin={{ top: 120, right: 20, bottom: 120, left: 20 }}
        id="id"
        value="size"
        enableLabels={false}
        padding={32}
        labelsFilter={(e) => e.node.depth === currentDepth + 1}
        tooltip={() => null as any}
        borderWidth={0}
        zoomedId={zoomedId}
        motionConfig="slow"
        circleComponent={CircleComponent}
        colors={selectedBucket.color}
        childColor={{ from: 'color', modifiers: [['brighter', 0.4]] }}
        inheritColorFromParent
        onClick={(node) => {
          let id: string
          let depth
          if (zoomedId !== node.id) {
            id = node.id
            depth = node.depth
          } else if (selectedBucket.parent) {
            id = selectedBucket.parent.id
            depth = selectedBucket.parent.level - 1
          } else {
            return
          }

          setZoomedId(id)
          setDepth(depth)
          if (id) {
            const bucket = buckets.find((b) => b.id === id)

            if (bucket) {
              navigateTo(bucket)
            }
          }
        }}
      />
    </Container>
  )
}

export default observer(BucketCanvas)
