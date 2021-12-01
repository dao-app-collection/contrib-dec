import * as React from 'react'
import { FC, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled, { css } from 'styled-components'
import { ResponsiveCirclePacking } from '@nivo/circle-packing'
import { useTheme } from '@nivo/core'
import { animated, to, SpringValue, Interpolation } from '@react-spring/web'
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

const commonProperties = {
  width: 900,
  height: 500,
  padding: 2,
  id: 'name',
  value: 'loc',
  labelsSkipRadius: 16,
}

type DataItem = {
  name: string
  color: string
  children: DataItem[]
  loc: number
}

const LabelContainer = styled.div``

const LabelComponent = (props) => {
  console.log(props)

  return <LabelContainer {...props}>hey label </LabelContainer>
}

export const interpolatePosition = (
  positionValue: SpringValue<number>,
  radiusValue: Interpolation<number>
) => to([positionValue, radiusValue], (position, radius) => position - radius)

export const interpolateSize = (radiusValue: Interpolation<number>) =>
  to([radiusValue], (radius) => radius * 2)

export const interpolateBorderWidth = (borderWidth: number, radiusValue: Interpolation<number>) =>
  to([radiusValue], (radius) => Math.min(borderWidth, radius))

const LabelHtml = <RawDatum,>({ node, label, style }: LabelProps<RawDatum>) => {
  const size = interpolateSize(style.radius)
  const theme = useTheme()
  return (
    <animated.text
      key={node.id}
      style={{
        ...theme.labels.text,
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: interpolatePosition(style.y, style.radius),
        left: interpolatePosition(style.x, style.radius),
        width: size,
        height: size,
        color: style.textColor,
        opacity: style.opacity,
        pointerEvents: 'none',
      }}
    >
      {label} hej hej
    </animated.text>
  )
}

const BucketCanvas: FC = () => {
  const { buckets, selectedBucket, navigateTo, dao } = useDao()
  const available = selectedBucket?.children || []
  const [zoomedId, setZoomedId] = useState<string | null>(null)

  useEffect(() => {
    if (selectedBucket && selectedBucket.id !== zoomedId) {
      setZoomedId(selectedBucket.name)
    }
  }, [selectedBucket])

  useEffect(() => {
    if (zoomedId) {
      const bucket = buckets.find((b) => b.name === zoomedId)

      if (bucket) {
        navigateTo(bucket)
      }
    }
  }, [zoomedId])

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

  return (
    <Container>
      <ResponsiveCirclePacking
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        id="name"
        value="loc"
        colors={{ scheme: 'purple_red' }}
        childColor={{ from: 'color', modifiers: [['brighter', 0.4]] }}
        enableLabels
        padding={32}
        labelsFilter={function (e) {
          return e.node.depth > 0
        }}
        tooltip={() => null}
        labelsSkipRadius={10}
        labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
        zoomedId={zoomedId}
        motionConfig="slow"
        // labelComponent={LabelHtml}
        onClick={(node) => {
          setZoomedId(zoomedId === node.id ? null : node.id)
        }}
        defs={[
          {
            id: 'lines',
            type: 'patternLines',
            background: 'none',
            color: 'inherit',
            rotation: -45,
            lineWidth: 5,
            spacing: 8,
          },
        ]}
        fill={[{ match: { depth: 1 }, id: 'lines' }]}
      />
    </Container>
  )
}

export default observer(BucketCanvas)
