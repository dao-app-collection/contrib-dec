import { Divider, Page, Spacer } from '@geist-ui/react'
import * as React from 'react'
import { FC } from 'react'
import styled from 'styled-components'
import AvailableBuckets from './AvailableBuckets'
import Features from './Features'
import Header from './Header'
import TextPart from './TextPart'
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
const twitters = ['@jontgus', '@danielivert', '@Adam_Strandberg', '@Morkeeth', '@_geimaj', '@0xbud']

const LandingPage: FC = () => {
  return (
    <Wrapper>
      <Page>
        <Inner>
          <Header />
          <Spacer h={8} />
          <Features />

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
                Our mission is to ability to upvote and downvote well-written tasks. For members and
                externals to quickly find and filter between tasks within a bucket.
              </p>
              <p>
                Our mission is to ability to upvote and downvote well-written tasks. For members and
                externals to quickly find and filter between tasks within a bucket. Built by{' '}
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

          <AvailableBuckets />
        </Inner>
      </Page>
    </Wrapper>
  )
}

export default LandingPage
