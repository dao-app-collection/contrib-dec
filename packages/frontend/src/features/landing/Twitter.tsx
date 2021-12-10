import styled from 'styled-components'
import { Spacer } from '@geist-ui/react'
import TryContribButton from './TryContribButton'
import { spacingIncrement } from '../../theme/utils'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.div`
  font-size: 2.125rem;
  font-weight: 600;
  text-align: center;

  a {
    color: ${({ theme }) => theme.contrib.primary};
    margin-left: ${spacingIncrement(6)};

    &:hover {
      opacity: 0.8;
    }
  }
`

const Twitter: React.FC = () => {
  return (
    <Wrapper>
      <Title>
        Follow us on twitter{' '}
        <a href="https://twitter.com/ContribDAO" target="_blank" rel="noreferrer">
          @ContribDAO
        </a>
      </Title>
      <Spacer h={2} />
      <TryContribButton />
    </Wrapper>
  )
}

export default Twitter
