import { Grid, Spacer } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { pixelSizes } from '../../theme/breakpoints'

const items = [
  {
    img: '/rome.png',
    name: 'RomeDAO',
    url: '/romedao',
  },
  {
    img: '/orakuru.jpeg',
    name: 'Orakuru',
    url: '/orakuru',
  },
  {
    img: '/dxdao.png',
    name: 'DXdao',
    url: '/dxdao',
  },
  {
    img: '/mate.png',
    name: 'Mate',
    url: '/mate',
  },
]

const Item = styled.div`
  a {
    align-items: center;
    color: white;
    display: flex;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 0.75;
    }
  }
  h2 {
    color: white;
  }

  @media (max-width: ${pixelSizes.tablet}) {
    h2 {
      font-size: 30px;
    }
  }
`

const Image = styled.div`
  border-radius: 50%;
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02), 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035), 22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05), 100px 100px 80px rgba(0, 0, 0, 0.07);
  height: 120px;
  margin-right: 40px;
  overflow: hidden;

  width: 120px;

  @media (max-width: ${pixelSizes.tablet}) {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }

  img {
    height: 100%;
    width: 100%;
  }
`
const Container = styled.div`
  h2 {
    text-align: center;
  }
`

const DAOList: FC = () => {
  return (
    <Container>
      <h2>Explore use-cases</h2>
      <Spacer h={4} />
      <Grid.Container gap={4} justify="center">
        {items.map((item) => (
          <Grid key={item.name} md={10} xs={24}>
            <Item>
              <Link href={item.url}>
                <a>
                  <Image>
                    <img src={item.img} alt={item.name} />
                  </Image>
                  <h2>{item.name}</h2>
                </a>
              </Link>
            </Item>
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  )
}

export default DAOList
