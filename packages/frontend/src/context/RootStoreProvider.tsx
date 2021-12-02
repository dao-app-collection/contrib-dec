import { toast } from 'react-toastify'
import { createContext, useContext } from 'react'
import { RootStore } from '../stores/RootStore'

const StoreContext = createContext<RootStore | undefined>(undefined)

// local module level variable - holds singleton store
let store: RootStore

// function to initialize the store
// eslint-disable-next-line @typescript-eslint/no-shadow
function initializeStore(toast: any): RootStore {
  const _store = store ?? new RootStore(toast)

  // For server side rendering always create a new store
  if (typeof window === 'undefined') return _store

  // Create the store once in the client
  if (!store) store = _store

  return _store
}

// https://dev.to/ivandotv/mobx-server-side-rendering-with-next-js-4m18
export const RootStoreProvider: React.FC = ({ children }) => {
  // only create the store once (store is a singleton)
  const _store = initializeStore(toast)

  return <StoreContext.Provider value={_store}>{children}</StoreContext.Provider>
}

export const useRootStore = (): RootStore => {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider')
  }

  return context
}
