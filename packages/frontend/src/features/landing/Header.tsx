import { Spacer } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import Heading from '../../components/Heading'
import { pixelSizes } from '../../theme/breakpoints'

const topBlur = (
  <svg
    width="739"
    height="589"
    viewBox="0 0 739 589"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_49_212)">
      <ellipse
        cx="414.523"
        cy="315.719"
        rx="155.523"
        ry="207.719"
        fill="url(#paint0_radial_49_212)"
      />
      <ellipse
        cx="315.182"
        cy="316.182"
        rx="229.697"
        ry="266.949"
        transform="rotate(45 315.182 316.182)"
        fill="url(#paint1_radial_49_212)"
      />
      <ellipse
        rx="74.5442"
        ry="302.897"
        transform="matrix(0.742035 -0.670361 0.555963 0.831207 359.714 328.742)"
        fill="url(#paint2_radial_49_212)"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_49_212"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(414.523 315.719) rotate(90) scale(207.719 155.523)"
      >
        <stop stopColor="#F69EE2" />
        <stop offset="0.348958" stopColor="#C36BEE" stopOpacity="0.75" />
        <stop offset="1" stopColor="#C36BEE" stopOpacity="0" />
      </radialGradient>
      <radialGradient
        id="paint1_radial_49_212"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(315.182 316.182) rotate(90) scale(266.949 229.697)"
      >
        <stop stopColor="#A59EF6" />
        <stop offset="0.348958" stopColor="#8D6BEE" stopOpacity="0.75" />
        <stop offset="1" stopColor="#7D6BEE" stopOpacity="0" />
      </radialGradient>
      <radialGradient
        id="paint2_radial_49_212"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(74.5442 302.897) rotate(90) scale(302.897 74.5442)"
      >
        <stop stopColor="#F69EA3" />
        <stop offset="0.348958" stopColor="#EE6B9A" stopOpacity="0.75" />
        <stop offset="1" stopColor="#EE6B9A" stopOpacity="0" />
      </radialGradient>
      <clipPath id="clip0_49_212">
        <rect width="739" height="589" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const Container = styled.header`
  position: relative;

  svg {
    height: 800px;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -30%);
    width: 800px;
  }
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 760px;
  position: relative;
  text-align: center;
  z-index: 2;

  p {
    font-size: 22px;
  }

  h1 {
    font-size: 74px;
  }

  h3 {
    font-size: 42px;
  }

  @media (max-width: ${pixelSizes.tablet}) {
    p {
      font-size: 20px;
    }

    h1 {
      font-size: 40px;
    }

    h3 {
      font-size: 32px;
    }
  }
`

const Header: FC = () => {
  return (
    <Container>
      {topBlur}

      <Content>
        <Spacer h={4} />
        <Heading type="h1">Contrib.</Heading>
        <Spacer h={4} />
        <h3>Get a clear overview of tasks and token flows in your DAO.</h3>
        <Spacer h={3} />
        <p>DAO contribution and experience, validated on-chain.</p>
      </Content>
    </Container>
  )
}

export default Header
