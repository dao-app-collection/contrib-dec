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
    third: '#171717',
    placeholder: '#A1A1A1',
    card: '#3E3E3E',
  },
  text: {
    primary: ' #FFF',
    smooth: '#CACFDB',
  },
  taskStatus: {
    open: 'rgba(75, 241, 60, 0.24)',
    claimes: 'rgba(75, 241, 60, 0.24)',
    completed: 'rgba(75, 241, 60, 0.24)',
  },
  taskStatusText: {
    open: '#C1FFBC',
    claimes: '#C1FFBC',
    completed: '#C1FFBC',
  },

  gap: (value: number) => `${value * 8}px`,
}
