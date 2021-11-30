import { DefaultTheme } from 'styled-components'
import { fontSizes } from './font-sizes'

export const darkTheme: DefaultTheme = {
  fontSize: fontSizes,
  font: {
    standard: "'Sora', sans-serif;",
  },
  dao: {
    primary: 'var(--dao-primary-color)',
    inverted: 'var(--dao-inverted-color)',
  },

  bg: {
    primary: '#252525',
  },
  text: {
    primary: ' #FFF',
  },
}
