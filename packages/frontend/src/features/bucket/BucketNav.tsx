import { Breadcrumbs } from '@geist-ui/react'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
// import BucketEditAction from '../bucket-crud/BucketEditAction'
import Heading from '../../components/Heading'
import { useDao } from '../../context/DaoContext'
import useIsBucketOwner from '../../hooks/useIsBucketOwner'
import { notEmpty } from '../../utils/array-utils'

const Container = styled.div`
  align-items: center;
  display: flex;
`

const arrowBack = (
  <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1L2 7L8 13" stroke="white" strokeWidth="1.5" />
  </svg>
)
const BackArrowWrap = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.bg.placeholder};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 33px;
  justify-content: center;
  transition: opacity 0.3s ease;
  width: 33px;
  &:hover {
    opacity: 0.5;
  }
`

const ArrowWrap = styled.div`
  margin-right: ${(props) => props.theme.gap(2)};
  min-width: 33px;
`

const Link = styled.a`
  color: inherit;
`

const BucketNav: FC = () => {
  const { selectedBucket, navigateTo } = useDao()
  const isOwner = useIsBucketOwner()

  const items = []
  let parent = selectedBucket?.parent

  if (!selectedBucket) {
    return null
  }

  while (parent) {
    if (parent) {
      items.unshift(parent)
      parent = parent.parent
    }
  }

  items.push(selectedBucket)

  return (
    <Container>
      <ArrowWrap>
        {selectedBucket.parent && (
          <BackArrowWrap onClick={() => navigateTo(selectedBucket.parent)}>
            {arrowBack}
          </BackArrowWrap>
        )}
      </ArrowWrap>
      <div>
        <Heading type="h2">{selectedBucket.name}</Heading>
        {items.length > 1 && (
          <Breadcrumbs>
            {items.filter(notEmpty).map((item) => (
              <Breadcrumbs.Item key={item.id}>
                <Link
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo(item)
                  }}
                >
                  {item.name}
                </Link>
              </Breadcrumbs.Item>
            ))}
          </Breadcrumbs>
        )}
      </div>
      {/* {true && <BucketEditAction />} */}
    </Container>
  )
}

export default observer(BucketNav)
