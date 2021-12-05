import styled from 'styled-components'
import Div100vh from 'react-div-100vh'
import { Page } from '@geist-ui/react'
import CreateBucketButton from '../features/create-bucket/CreateBucketButton'
import { centered } from '../theme/utils'

const Wrapper = styled(Div100vh)`
  ${centered};
`

const Index: React.FC = () => {
  return (
    <Page>
      <Wrapper>
        <CreateBucketButton />
      </Wrapper>
    </Page>
  )
}

export default Index
