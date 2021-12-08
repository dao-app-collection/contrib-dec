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

  const topLevel = selectedBucket?.topLevel

  if (!topLevel) {
    return null
  }

  const maxLevel = Math.max(...buckets.map((bucket) => bucket.level))

  const createChild = (b: BucketEntity): DataItem => {
    const symbol = b.token.symbol() || ''

    return {
      name: b.name,
      children: b.children.map((c) => createChild(c)) || [],
      color: toJS(b.color),
      gotChildren: Boolean(b.children.length),
      size: b.allocation?.toNumber() || 1,
      isSelected: b.name === zoomedId,
      currentDepth,
      entity: {
        logo: b.data?.logo,
        allocation: b.allocation?.toNumber() || 0,
        tokenSymbol: typeof symbol === 'string' ? symbol : symbol[0],
      },
    }
  }

  const data = createChild(topLevel)

  return (
    <Container>
      <ResponsiveCirclePackingHtml
        data={data}
        margin={{ top: 120, right: 20, bottom: 120, left: 20 }}
        id="name"
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
