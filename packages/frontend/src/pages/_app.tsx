import { configure } from 'mobx'
import { AppProps } from 'next/app'

import '@fontsource/open-sans/700.css'
import '@fontsource/inter'
import { RootStoreProvider } from '../context/RootStoreProvider'
import AppBootstrap from '../components/AppBootstrap'

import 'antd/dist/antd.css'

// mobx config
configure({
  enforceActions: 'observed',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
})

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <RootStoreProvider>
      <AppBootstrap>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </AppBootstrap>
    </RootStoreProvider>
  )
}

export default App
