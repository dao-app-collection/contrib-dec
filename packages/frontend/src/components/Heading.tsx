import styled, { css } from 'styled-components'
import { media } from '../utils/theme/media'
import { getLineHeight } from '../utils/theme/utils'
import { primaryFontFamily } from '../utils/theme/general-settings'

type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

type Props = {
  type?: HeadingSize
  className?: string
}

export const lineHeightHeadings = css`
  line-height: ${getLineHeight('22')};
  text-align: center;

  ${media.phone`
    line-height: ${getLineHeight('15')};
  `}
`

const Heading1 = styled.h1`
  ${primaryFontFamily}
  ${lineHeightHeadings}
  font-size: ${({ theme }): string => theme.fontSize['5xl']};

  ${media.tablet`
    font-size: ${({ theme }): string => theme.fontSize['2xl']};
  `}
`

const Heading2 = styled.h2`
  ${primaryFontFamily}
  ${lineHeightHeadings}
  font-size: ${({ theme }): string => theme.fontSize['4xl']};

  ${media.tablet`
    font-size: ${({ theme }): string => theme.fontSize.xl};
  `}
`

const Heading3 = styled.h3`
  ${primaryFontFamily}
  ${lineHeightHeadings}
  font-size: ${({ theme }): string => theme.fontSize['3xl']};

  ${media.tablet`
    font-size: ${({ theme }): string => theme.fontSize.lg};
  `}
`

const Heading4 = styled.h4`
  ${primaryFontFamily}
  ${lineHeightHeadings}
  font-size: ${({ theme }): string => theme.fontSize['2xl']};
`

const Heading5 = styled.h5`
  ${primaryFontFamily}
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