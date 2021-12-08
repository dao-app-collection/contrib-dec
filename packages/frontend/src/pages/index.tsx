import styled from 'styled-components'
import Div100vh from 'react-div-100vh'
import { Page } from '@geist-ui/react'
import React from 'react'
import CreateBucketButton from '../features/bucket-crud/CreateBucketButton'
import { centered } from '../theme/utils'
import AvailableBuckets from '../features/landing/AvailableBuckets'

const Wrapper = styled(Div100vh)`
  ${centered};
`

const Index: React.FC = () => {
  return (
    <Page>
      <AvailableBuckets />
      <CreateBucketButton />
    </Page>
  )
}

export default Index
