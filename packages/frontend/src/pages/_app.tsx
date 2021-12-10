import { configure } from 'mobx'
import { AppProps } from 'next/app'

import { RootStoreProvider } from '../context/RootStoreProvider'
import AppBootstrap from '../components/AppBootstrap'
import Header from '../components/Header'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-loading-skeleton/dist/skeleton.css'

// mobx config
configure({
  enforceActions: 'observed',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
})

const App = ({ Component, pageProps, router, ...rest }: AppProps): React.ReactElement => {
  return (
    <RootStoreProvider>
      <AppBootstrap>
        {router.asPath !== '/' && <Header />}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </AppBootstrap>
    </RootStoreProvider>
  )
}

export default App
