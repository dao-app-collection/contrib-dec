import * as React from 'react'
import { FC, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled, { css } from 'styled-components'
import { ResponsiveCirclePacking, ResponsiveCirclePackingHtml } from '@nivo/circle-packing'
import { useTheme } from '@nivo/core'
import { animated, to, SpringValue, Interpolation } from '@react-spring/web'
import CircleComponent from './canvas/CircleComponent'
import { useDao } from '../../context/DaoContext'
import { BucketEntity } from '../../stores/entities/Bucket.entity'

const Container = styled.div`
  background-color: #321c6f;
  height: 100%;
  left: 0;
  position: absolute;
  right: 420px;
  top: 0;
`

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
type DataItem = {
  name: string
  color: string
  children: DataItem[]
  loc: number
}

export const interpolatePosition = (
  positionValue: SpringValue<number>,
  radiusValue: Interpolation<number>
) => to([positionValue, radiusValue], (position, radius) => position - radius)

export const interpolateSize = (radiusValue: Interpolation<number>) =>
  to([radiusValue], (radius) => radius * 2)

export const interpolateBorderWidth = (borderWidth: number, radiusValue: Interpolation<number>) =>
  to([radiusValue], (radius) => Math.min(borderWidth, radius))

const BucketCanvas: FC = () => {
  const { buckets, selectedBucket, navigateTo } = useDao()
  const available = selectedBucket?.children || []
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

  const createChild = (b: BucketEntity): DataItem => {
    return {
      name: b.name,
      children: b.children.map(createChild) || [],
      color: 'hsl(344, 70%, 50%)',
      loc: b.level,
    }
  }

  const data = createChild(buckets[0])
  const extraProps = {
    currentDepth,
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
        labelsFilter={(e) => {
          return e.node.depth === currentDepth + 1
        }}
        tooltip={() => null}
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
