import { observer } from 'mobx-react-lite'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../theme/GlobalStyle'
import { darkTheme } from '../theme/dark-theme'

const AppBootstrap: React.FC = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  )
}

export default observer(AppBootstrap)
