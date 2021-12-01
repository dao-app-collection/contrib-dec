import { observer } from 'mobx-react-lite'
import { ThemeProvider } from 'styled-components'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import { useEffect } from 'react'
import GlobalStyle from '../theme/GlobalStyle'
import { darkTheme } from '../theme/dark-theme'
import { useRootStore } from '../context/RootStoreProvider'

const AppBootstrap: React.FC = ({ children }) => {
  const { uiStore, localStorageStore } = useRootStore()

  useEffect(() => {
    localStorageStore.load()
  }, [localStorageStore])

  return (
    <>
      <GeistProvider themeType={uiStore.selectedTheme}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </GeistProvider>
    </>
  )
}

export default observer(AppBootstrap)
