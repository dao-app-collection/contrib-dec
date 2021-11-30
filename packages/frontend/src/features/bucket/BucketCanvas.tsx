import * as React from 'react'
import { FC } from 'react'
import Link from 'next/link'
import { observer } from 'mobx-react-lite'
import styled, { css } from 'styled-components'
import { useDao } from '../../context/DaoContext'

const Container = styled.div`
  height: 100%;
  padding: 20px;
  position: absolute;
  width: 100%;
`

const Blob = styled.div<{ selected: boolean }>`
  align-items: center;
  align-items: center;
  border: 1px solid #000;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 200px;
  text-align: center;
  width: 200px;

  ${(props) =>
    props.selected &&
    css`
      background-color: #000;
      color: white;
    `}
`

const BucketCanvas: FC = () => {
  const { buckets, selectedBucket, navigateTo } = useDao()
  return (
    <Container>
      {buckets.map((bucket) => (
        <Blob
          key={bucket.id}
          onClick={() => navigateTo(bucket)}
          selected={selectedBucket?.id === bucket.id}
        >
          <div>{bucket.name}</div>

          <div>level: {bucket.level}</div>
        </Blob>
      ))}
    </Container>
  )
}

export default observer(BucketCanvas)
