import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import BucketInner from './BucketInner'
import Heading from '../../components/Heading'
import useSelectedBucket from '../../hooks/useSelectedBucket'

const Container = styled.div`
  background-color: ${(props) => props.theme.bg.primary};
  color: ${(props) => props.theme.text.primary};

  height: 100%;
  margin-left: auto;
  padding: 20px;
  width: 420px;
`

const BucketContent: FC = () => {
  const selected = useSelectedBucket()

  if (!selected) {
    return null
  }

  return (
    <Container>
      <Heading type="h2">{selected.name}</Heading>
      <div>{selected.children.length} sub-buckets</div>
      <BucketInner />
    </Container>
  )
}

export default BucketContent
