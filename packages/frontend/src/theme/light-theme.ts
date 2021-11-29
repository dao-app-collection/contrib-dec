import { DefaultTheme } from 'styled-components'
import { fontSizes } from './font-sizes'
import {
  primaryFontFamily,
  secondaryFontFamily,
  borderRadius,
  extraBold,
  bodyFontSize,
  borderColor,
  boxRadiusPx,
} from './general-settings'

// Fonts
const primaryFontColor = '#1D293F'
const secondaryFontColor = '#8C97AC'
const grayFontColor = '#5D5D5D'
const grayFontColorLight = '#7c8087'
const whiteFontColor = '#FFFFFF'

// Colors
const primaryColor = '#5700B3'
const secondaryColor = '#1B2436'
const errorColor = '#ed139d'
const primaryAccentColor = '#000000'
const secondaryAccentColor = '#0DC675'
const thirdAccentColor = '#07653B'
const lightGray = '#F2EBF9'

const primaryBackgroundColor = '#FFFFFF'
const secondaryBackgroundColor = '#FFFFFF'
const thirdBackgroundColor = '#0C001A'

export const lightTheme: DefaultTheme = {
  fontSize: fontSizes,
  primaryFontFamily,
  secondaryFontFamily,
  primaryColor,
  primaryBackgroundColor,
  secondaryBackgroundColor,
  secondaryColor,
  primaryFontColor,
  secondaryFontColor,
  grayFontColor,
  grayFontColorLight,
  whiteFontColor,
  borderColor,
  borderRadius,
  extraBold,
  boxRadiusPx,
  bodyFontSize,
  primaryAccentColor,
  secondaryAccentColor,
  thirdAccentColor,
  thirdBackgroundColor,
  errorColor,
  lightGray,
}
