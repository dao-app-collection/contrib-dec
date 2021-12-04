import { FC } from 'react'
import styled from 'styled-components'
import BucketCanvas from './canvas/BucketCanvas'
import BucketContent from './BucketContent'

const Container = styled.div`
  background-color: #321c6f;
  position: relative;
`

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1600px;
`
const Sidebar = styled.div`
  padding: ${(props) => props.theme.gap(2)};
`

const BucketPage: FC = () => {
  return (
    <Container>
      <Wrapper>
        <BucketCanvas />
        <Sidebar>
          <BucketContent />
        </Sidebar>
      </Wrapper>
    </Container>
  )
}

export default BucketPage
