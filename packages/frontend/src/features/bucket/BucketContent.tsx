import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import BucketInner from './BucketInner'
import Heading from '../../components/Heading'
import useSelectedBucket from '../../hooks/useSelectedBucket'
import { pixelSizes } from '../../theme/breakpoints'

const Container = styled.div`
  background-color: ${(props) => props.theme.bg.primary};
  color: ${(props) => props.theme.text.primary};

  /* margin-left: auto; */
  min-height: 100vh;
  padding: 20px;
  position: relative;
  width: 420px;
  z-index: 2;

  @media (max-width: ${pixelSizes.tablet}) {
    width: 100%;
    margin-top: 80vh;
  }
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
