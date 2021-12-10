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

export const reactSelectTheme = (theme) => ({
  ...theme,
  colors: {
    // ...theme.colors,
    primary25: '#000',
    primary: '#FFF',
    primary75: '#fafafa',
    primary50: '#fafafa',

    // All possible overrides
    // primary: '#2684FF',
    // primary75: '#4C9AFF',
    // primary50: '#B2D4FF',
    // primary25: '#DEEBFF',

    // danger: '#DE350B',
    // dangerLight: '#FFBDAD',

    neutral0: 'hsl(0, 0%, 20%)',
    // neutral5: 'hsl(0, 0%, 95%)',
    // neutral10: 'hsl(0, 0%, 90%)',
    // neutral20: 'hsl(0, 0%, 80%)',
    // neutral30: 'hsl(0, 0%, 70%)',
    // neutral40: 'hsl(0, 0%, 60%)',
    // neutral50: 'hsl(0, 0%, 50%)',
    // neutral60: 'hsl(0, 0%, 40%)',
    // neutral70: 'hsl(0, 0%, 30%)',
    // neutral80: 'hsl(0, 0%, 20%)',
    // neutral90: 'hsl(0, 0%, 10%)',
  },
  // Other options you can use
  // borderRadius: 4
  // baseUnit: 4,
  // controlHeight: 38
  // menuGutter: baseUnit * 2
})
