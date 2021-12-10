import { Divider, Page, Spacer } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import Features from './Features'
import Header from './Header'
import TextPart from './TextPart'
import DAOList from './DAOList'
import Upcoming from './Upcoming'
import Twitter from './Twitter'
import Navigation from './Navigation'
import { pixelSizes } from '../../theme/breakpoints'
import SEO from '../../components/SEO'

const Wrapper = styled.div`
  background: radial-gradient(
      28.1% 21.5% at -2.5% 30.81%,
      rgba(246, 211, 158, 0.35) 0%,
      rgba(238, 154, 107, 0.2625) 34.9%,
      rgba(238, 131, 107, 0) 100%
    ),
    radial-gradient(
      95.37% 95.37% at 113.05% -4.81%,
      rgba(165, 158, 246, 0.42) 0%,
      rgba(141, 107, 238, 0.315) 34.9%,
      rgba(125, 107, 238, 0) 100%
    ),
    radial-gradient(
      45% 45% at 14.19% 90.69%,
      rgba(255, 46, 0, 0.3) 0%,
      rgba(238, 107, 225, 0.225) 40.63%,
      rgba(107, 152, 238, 0) 100%
    ),
    #000000;
  main,
  section,
  header,
  svg {
    overflow: visible;
  }

  @media (max-width: ${pixelSizes.tablet}) {
    background: radial-gradient(
        95.37% 95.37% at 113.05% -4.81%,
        rgba(165, 158, 246, 0.42) 0%,
        rgba(141, 107, 238, 0.315) 34.9%,
        rgba(125, 107, 238, 0) 100%
      ),
      #000000;

    &&& section {
      width: auto;
    }
  }

  a {
    color: ${(props) => props.theme.contrib.primary};
  }
`
const Inner = styled.div`
  margin: 0 auto;

  max-width: 1185px;
`
const twitters = [
  '@jontgus',
  '@danielivert',
  '@Adam_Strandberg',
  '@Morkeeth',
  '@_geimaj',
  // '@0xbud'
]

const LandingPage: FC = () => {
  return (
    <Wrapper>
      <Navigation />
      <Page>
        <Inner>
          <Header />
          <Spacer h={8} />
          <Features />
          <Spacer h={8} />
          <Upcoming />
          <Spacer h={4} />
          <Divider />
          <TextPart title="Making DAOs organized">
            <div>
              <p>
                Create a clear and structured overview of DAO-allocations. A better way to create
                ownership, increase DAO-visibility and create a culture of contribution.
              </p>
              <p>
                Turn members into contributors and launch your own task overview simplyfing the
                contributor experience.
              </p>
            </div>
          </TextPart>
          <Divider />

          <TextPart title="How it started">
            <div>
              <p>
                After being on both sides of the table of contribution. As Discord lurkers,
                contributing DAO-members and part of core teams - we build a tool that we need, and
                that we want to use. Without any limits 100% flexible to the DAO:s need! We wanted
                to create a better overview of DAO:s their members, domains and open tasks! To see
                how funds are allocated and even suggest where you feel contribution is needed.
              </p>
              <p>
                A new way for DAOs to get their members to start contributing and make it easier for
                the core team and DAO to decide on future core contributors. Partitioning funds into
                buckets creates transparency for anyone to easily see what funds have been allocated
                to a specific area and who is currently in control of them. It also enables the DAO
                to perform analysis such as which domains are using the capital in the most
                efficient manner.
              </p>

              <p>
                Built by:{' '}
                {twitters.map((twitt, i) => (
                  <span key={twitt}>
                    <a
                      href={`https://twitter.com/${twitt}`}
                      target="_blank"
                      title={twitt}
                      rel="noreferrer"
                    >
                      {twitt}
                    </a>
                    {i < twitters.length - 1 && ','}{' '}
                  </span>
                ))}
              </p>
            </div>
          </TextPart>
          <Divider />
          <Spacer h={4} />

          <DAOList />
          <Spacer h={14} />
          <Twitter />
          {/* <AvailableBuckets /> */}
        </Inner>
      </Page>
    </Wrapper>
  )
}

export default LandingPage
