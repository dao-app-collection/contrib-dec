import styled, { css } from 'styled-components'
import { media } from '../theme/media'
import { getLineHeight } from '../theme/utils'

type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

type Props = {
  type?: HeadingSize
  className?: string
}

export const lineHeightHeadings = css`
  line-height: ${getLineHeight('22')};
  ${media.phone`
    line-height: ${getLineHeight('15')};
  `}
`

const Heading1 = styled.h1`
  ${lineHeightHeadings}
  font-size: ${({ theme }): string => theme.fontSize['5xl']};

  ${media.tablet`
    font-size: ${({ theme }): string => theme.fontSize['2xl']};
  `}
`

const Heading2 = styled.h2`
  ${lineHeightHeadings}
  font-size: ${({ theme }): string => theme.fontSize['4xl']};
  font-weight: 100;

  ${media.tablet`
    font-size: ${({ theme }): string => theme.fontSize.xl};
  `}
`

const Heading3 = styled.h3`
  ${lineHeightHeadings}
  font-size: ${({ theme }): string => theme.fontSize.sm};
  margin: 0;
`

const Heading4 = styled.h4`
  ${lineHeightHeadings}
  font-size: ${({ theme }): string => theme.fontSize['2xl']};
`

const Heading5 = styled.h5`
  ${lineHeightHeadings}
  font-size: ${({ theme }): string => theme.fontSize.xl};
`

const Heading: React.FC<Props> = ({ type = 'h1', className, children }) => {
  const headingSize = {
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    h5: Heading5,
  }

  const HeadingComponent = headingSize[type]

  return <HeadingComponent className={className}>{children}</HeadingComponent>
}

export default Heading
