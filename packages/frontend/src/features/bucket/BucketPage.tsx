import { FC } from 'react'
import styled from 'styled-components'
import BucketCanvas from './BucketCanvas'
import BucketOverview from './BucketOverview'
import { useDao } from '../../context/DaoContext'
import Heading from '../../components/Heading'

const Container = styled.div`
  height: 100%;
  position: relative;
`

const BucketPage: FC = () => {
  const context = useDao()

  return (
    <Container>
      <BucketCanvas />
      <BucketOverview />
    </Container>
  )
}

export default BucketPage
