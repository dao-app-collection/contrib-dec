import { FC } from 'react'
import styled from 'styled-components'
import BucketCanvas from './BucketCanvas'
import BucketContent from './BucketContent'

const Container = styled.div`
  height: 100%;
  position: relative;
`

const BucketPage: FC = () => {
  return (
    <Container>
      <BucketCanvas />
      <BucketContent />
    </Container>
  )
}

export default BucketPage
