import { Grid, Spacer, Text } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'

const culture = (
  <svg width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="41.5" cy="41.5" r="41.5" fill="url(#paint0_linear_88_133)" fillOpacity="0.58" />
    <path
      d="M50.8076 48.9297C50.8076 43.2035 55.4496 38.5615 61.1758 38.5615C66.9019 38.5615 71.5439 43.2035 71.5439 48.9297H50.8076Z"
      fill="url(#paint1_linear_88_133)"
    />
    <circle cx="61.1756" cy="30.636" r="6.03446" fill="url(#paint2_linear_88_133)" />
    <path
      d="M10.8857 48.9297C10.8857 43.2035 15.5277 38.5615 21.2539 38.5615C26.98 38.5615 31.622 43.2035 31.622 48.9297H10.8857Z"
      fill="url(#paint3_linear_88_133)"
    />
    <circle cx="21.2537" cy="30.636" r="6.03446" fill="url(#paint4_linear_88_133)" />
    <path
      d="M22.665 59.9332C22.665 49.5566 31.0769 41.1447 41.4535 41.1447C51.8301 41.1447 60.242 49.5566 60.242 59.9332H22.665Z"
      fill="url(#paint5_linear_88_133)"
    />
    <circle cx="41.4534" cy="27.6262" r="10.9353" fill="url(#paint6_linear_88_133)" />
    <defs>
      <linearGradient
        id="paint0_linear_88_133"
        x1="2.52689e-06"
        y1="-10.4716"
        x2="78.2945"
        y2="94.8016"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7C6BC8" />
        <stop offset="1" stopColor="#7B66D4" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_88_133"
        x1="61.1758"
        y1="38.5615"
        x2="61.1758"
        y2="48.9297"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9DBFF" />
        <stop offset="1" stopColor="#7F6C9B" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_88_133"
        x1="61.1756"
        y1="24.6016"
        x2="61.1756"
        y2="36.6705"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9DBFF" />
        <stop offset="1" stopColor="#7F6C9B" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_88_133"
        x1="21.2539"
        y1="38.5615"
        x2="21.2539"
        y2="48.9297"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9DBFF" />
        <stop offset="1" stopColor="#7F6C9B" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_88_133"
        x1="21.2537"
        y1="24.6016"
        x2="21.2537"
        y2="36.6705"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9DBFF" />
        <stop offset="1" stopColor="#7F6C9B" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_88_133"
        x1="41.4535"
        y1="41.1447"
        x2="41.4535"
        y2="59.9332"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9DBFF" />
        <stop offset="1" stopColor="#7F6C9B" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_88_133"
        x1="41.4534"
        y1="16.6909"
        x2="41.4534"
        y2="38.5615"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9DBFF" />
        <stop offset="1" stopColor="#7F6C9B" />
      </linearGradient>
    </defs>
  </svg>
)

const flex = (
  <svg width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="41.5" cy="41.5" r="41.5" fill="url(#paint0_linear_88_131)" fillOpacity="0.58" />
    <circle cx="65.119" cy="33.3583" r="6.14346" fill="url(#paint1_linear_88_131)" />
    <circle cx="22.82" cy="28.2084" r="11.2932" fill="url(#paint2_linear_88_131)" />
    <circle cx="45.4075" cy="53.3042" r="17.5329" fill="url(#paint3_linear_88_131)" />
    <defs>
      <linearGradient
        id="paint0_linear_88_131"
        x1="2.52689e-06"
        y1="-10.4716"
        x2="78.2945"
        y2="94.8016"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7C6BC8" />
        <stop offset="1" stopColor="#7B66D4" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_88_131"
        x1="65.119"
        y1="27.2148"
        x2="65.119"
        y2="39.5018"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9DBFF" />
        <stop offset="1" stopColor="#7F6C9B" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_88_131"
        x1="22.82"
        y1="16.9153"
        x2="22.82"
        y2="39.5016"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9DBFF" />
        <stop offset="1" stopColor="#7F6C9B" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_88_131"
        x1="45.4075"
        y1="35.7712"
        x2="45.4075"
        y2="70.8371"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9DBFF" />
        <stop offset="1" stopColor="#7F6C9B" />
      </linearGradient>
    </defs>
  </svg>
)
const bounties = (
  <svg width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="41.5" cy="41.5" r="41.5" fill="url(#paint0_linear_88_123)" fillOpacity="0.58" />
    <g clipPath="url(#clip0_88_123)">
      <path
        opacity="0.45"
        d="M50.5047 14.2729L41.448 29.8322H23.3486L32.3983 14.2729H50.5047Z"
        fill="#E7D8FD"
      />
      <path
        opacity="0.6"
        d="M41.4481 29.8322H59.5545L50.5048 14.2729H32.3984L41.4481 29.8322Z"
        fill="#E7D8FD"
      />
      <path
        opacity="0.8"
        d="M32.3983 45.3848L41.448 29.8322L32.3983 14.2729L23.3486 29.8322L32.3983 45.3848Z"
        fill="#E7D8FD"
      />
      <path
        opacity="0.45"
        d="M32.4883 68.727L41.5449 53.1677H59.6512L50.5946 68.727H32.4883Z"
        fill="#E7D8FD"
      />
      <path
        opacity="0.6"
        d="M41.5448 53.1677H23.4385L32.4882 68.727H50.5945L41.5448 53.1677Z"
        fill="#E7D8FD"
      />
      <path
        opacity="0.8"
        d="M50.5946 37.6154L41.5449 53.1679L50.5946 68.7272L59.6513 53.1679L50.5946 37.6154Z"
        fill="#E7D8FD"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_88_123"
        x1="2.52689e-06"
        y1="-10.4716"
        x2="78.2945"
        y2="94.8016"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7C6BC8" />
        <stop offset="1" stopColor="#7B66D4" stopOpacity="0" />
      </linearGradient>
      <clipPath id="clip0_88_123">
        <rect
          width="36.3027"
          height="54.4541"
          fill="white"
          transform="translate(23.3486 14.2729)"
        />
      </clipPath>
    </defs>
  </svg>
)
const contribs = (
  <svg width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="41.5" cy="41.5" r="41.5" fill="url(#paint0_linear_88_132)" fillOpacity="0.58" />
    <path
      d="M19.1963 64.4663C19.1963 51.9215 29.3659 41.7518 41.9108 41.7518C54.4557 41.7518 64.6253 51.9215 64.6253 64.4663H19.1963Z"
      fill="url(#paint1_linear_88_132)"
    />
    <circle cx="41.9107" cy="24.3277" r="13.2203" fill="url(#paint2_linear_88_132)" />
    <path
      d="M60.3122 32.4483C60.6116 31.527 61.915 31.527 62.2143 32.4483L63.8989 37.6329C64.0328 38.045 64.4167 38.3239 64.85 38.3239H70.3014C71.2701 38.3239 71.6729 39.5635 70.8892 40.1329L66.4789 43.3372C66.1284 43.5919 65.9817 44.0432 66.1156 44.4552L67.8002 49.6399C68.0996 50.5612 67.0451 51.3273 66.2614 50.7579L61.8511 47.5536C61.5006 47.299 61.026 47.299 60.6755 47.5536L56.2652 50.7579C55.4815 51.3273 54.427 50.5612 54.7263 49.6399L56.4109 44.4552C56.5448 44.0432 56.3981 43.5919 56.0476 43.3372L51.6373 40.1329C50.8536 39.5635 51.2564 38.3239 52.2251 38.3239H57.6766C58.1098 38.3239 58.4937 38.045 58.6276 37.6329L60.3122 32.4483Z"
      fill="url(#paint3_linear_88_132)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_88_132"
        x1="2.52689e-06"
        y1="-10.4716"
        x2="78.2945"
        y2="94.8016"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7C6BC8" />
        <stop offset="1" stopColor="#7B66D4" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_88_132"
        x1="41.9108"
        y1="41.7518"
        x2="41.9108"
        y2="64.4663"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9DBFF" />
        <stop offset="1" stopColor="#7F6C9B" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_88_132"
        x1="41.9107"
        y1="11.1074"
        x2="41.9107"
        y2="37.548"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9DBFF" />
        <stop offset="1" stopColor="#7F6C9B" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_88_132"
        x1="61.2633"
        y1="29.5212"
        x2="61.2633"
        y2="54.9999"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9DBFF" />
        <stop offset="1" stopColor="#7F6C9B" />
      </linearGradient>
    </defs>
  </svg>
)

const items = [
  {
    title: 'Contributor Culture',
    body: 'Make it a standard within your DAO that contribution is key. Support and incentives new and current contributors. Get an overview of who is doing what!',
    icon: culture,
  },

  {
    title: 'DAO Flexibility',
    body: 'No limits on DAO-structure, launch your buckets and task completely flexible to fit into your specific needs. Create transparency and increase DAO visibility.',
    icon: flex,
  },

  {
    title: 'Standard bounties',
    body: 'Smart Contracts in Solidity to serve as a Standard for Bounties for EVM dApps tested and recognised for maximum security and reliability. Lock up funds in an escrow contract and reward people for completing tasks.',
    icon: bounties,
  },

  {
    title: 'Turning members into contributors',
    body: 'Through a smooth and flexible onboarding we turn DAO contributors into members. Providing a structured and simple path to contribute and join/vibe.',
    icon: contribs,
  },
]

const Container = styled.div``
const Part = styled.div`
  /* align-items: center; */
  display: flex;

  h3 {
    margin-top: 22px;
  }

  p {
    color: ${(props) => props.theme.text.smooth};
    margin: 0;
  }
`
const Icon = styled.div`
  margin-right: ${(props) => props.theme.gap(4)};
`
const Title = styled.h2`
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.155em;
  text-align: center;
  text-transform: uppercase;
`
const Features: FC = () => {
  return (
    <Container>
      <Title>Features</Title>
      <Spacer h={2} />
      <Grid.Container gap={4}>
        {items.map((item) => (
          <Grid xs={24} md={12} key={item.title}>
            <Part>
              <Icon>{item.icon}</Icon>
              <div>
                <h3>{item.title}</h3>
                <Text p>{item.body}</Text>
              </div>
            </Part>
          </Grid>
        ))}
      </Grid.Container>
      <Spacer h={4} />
    </Container>
  )
}

export default Features
