import styled from 'styled-components'
import { spacingIncrement } from '../../theme/utils'

const Wrapper = styled.div`
  margin-right: ${spacingIncrement(20)};
  padding: ${spacingIncrement(20)};
  padding-top: ${spacingIncrement(40)};
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
`

const List = styled.ul`
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.md};
  justify-content: flex-end;
  list-style-type: none;
  margin: 0;
  padding: 0;
  z-index: 100;

  li {
    &:before {
      content: none;
      cursor: pointer;
    }

    a {
      color: ${({ theme }) => theme.text.primary};
      padding: 0 ${spacingIncrement(20)};

      &:hover {
        color: ${({ theme }) => theme.contrib.primary};
      }
    }
  }
`

const Navigation: React.FC = () => {
  return (
    <Wrapper>
      <nav>
        <List>
          <li>
            <a href="https://github.com/danielivert/contrib-dec" target="_blank" rel="noreferrer">
              Github
            </a>
          </li>
          <li>
            <a href="https://twitter.com/ContribDAO" target="_blank" rel="noreferrer">
              Twitter
            </a>
          </li>
        </List>
      </nav>
    </Wrapper>
  )
}

export default Navigation
