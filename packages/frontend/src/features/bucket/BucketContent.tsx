import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import BucketInner from './BucketInner'
import useSelectedBucket from '../../hooks/useSelectedBucket'
import { pixelSizes } from '../../theme/breakpoints'
import { Z_INDEX } from '../../utils/general-settings'

const Container = styled.div`
  background-color: ${(props) => props.theme.bg.primary};
  border: 1px solid #565656;
  border-radius: 8px;
  color: ${(props) => props.theme.text.primary};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  width: 420px;
  z-index: ${Z_INDEX.bucketContent};

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
      <BucketInner />
    </Container>
  )
}

export default BucketContent
