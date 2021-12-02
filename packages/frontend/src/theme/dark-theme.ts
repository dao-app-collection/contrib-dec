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
    accent: 'var(--dao-accent-color)',
  },

  bg: {
    primary: '#252525',
    placeholder: '#A1A1A1',
  },
  text: {
    primary: ' #FFF',
  },
}
