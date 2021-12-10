import { DefaultTheme } from 'styled-components'
import { fontSizes } from './font-sizes'

export const darkTheme: DefaultTheme = {
  fontSize: fontSizes,
  font: {
    standard: "'Sora', sans-serif;",
  },
  dao: {
    primary: 'var(--dao-primary-color)',
  },

  contrib: {
    primary: '#CA87FF',
  },

  bg: {
    secondary: '#000',
    primary: '#252525',
    placeholder: '#A1A1A1',
    card: '#3E3E3E',
  },
  text: {
    primary: ' #FFF',
    smooth: '#CACFDB',
  },

  gap: (value: number) => `${value * 8}px`,
}
