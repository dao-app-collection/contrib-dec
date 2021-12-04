import styled from 'styled-components'
import Div100vh from 'react-div-100vh'
import CreateBucketButton from '../features/create-bucket/CreateBucketButton'
import { centered } from '../theme/utils'

const Wrapper = styled(Div100vh)`
  ${centered};
`

const Index: React.FC = () => {
  return (
    <Wrapper>
      <CreateBucketButton />
    </Wrapper>
  )
}

export default Index
