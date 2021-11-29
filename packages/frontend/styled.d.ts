import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    fontSize: {
      sm: string
      base: string
      md: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
      '4xl': string
      '5xl': string
    }
    primaryFontFamily: string
    secondaryFontFamily: string
    primaryColor: string
    primaryBackgroundColor: string
    secondaryBackgroundColor: string
    secondaryColor: string
    primaryFontColor: string
    secondaryFontColor: string
    grayFontColor: string
    grayFontColorLight: string
    whiteFontColor: string
    borderColor: string
    borderRadius: number
    extraBold: number
    boxRadiusPx: string
    bodyFontSize: string
    primaryAccentColor: string
    secondaryAccentColor: string
    thirdAccentColor: string
    thirdBackgroundColor: string
    errorColor: string
    lightGray: string
  }
}
