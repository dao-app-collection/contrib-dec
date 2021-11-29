import { makeAutoObservable } from 'mobx'
import { RootStore } from './RootStore'
import { IS_BROWSER, MIN_IN_MS } from '../lib/constants'

const INACTIVITY_THRESHOLD = MIN_IN_MS * 5

export class BrowserStore {
  root: RootStore
  networkIsHealthy = true
  tabIsOpen = true
  tabLastActive = new Date()

  constructor(root: RootStore) {
    this.root = root
    this.initEventListeners()
    makeAutoObservable(this)
  }

  get tabIsInactive(): boolean {
    if (this.tabIsOpen) return false
    const msSinceTabActive = Math.max(
      this.root.clockStore.now.getTime() - this.tabLastActive.getTime(),
      0
    )
    return msSinceTabActive >= INACTIVITY_THRESHOLD
  }

  onVisibilityChange(event: { target: EventTarget | null }): void {
    const isHidden = (event.target as Document).hidden
    if (isHidden) {
      this.tabIsOpen = false
      this.tabLastActive = new Date()
    } else {
      this.tabIsOpen = true
    }
  }

  onInternetConnectionChange(status: 'online' | 'offline'): void {
    if (status === 'online') {
      this.root.uiStore.successToast('Network connection restored')
      this.root.web3Store.refreshChainState()
      this.networkIsHealthy = true
    } else {
      this.root.uiStore.warningToast('Network connectivity issues...')
      this.networkIsHealthy = false
    }
  }

  initEventListeners(): void {
    if (!IS_BROWSER) return
    document.addEventListener('visibilitychange', (event) => this.onVisibilityChange(event))
    window.addEventListener('online', () => this.onInternetConnectionChange('online'))
    window.addEventListener('offline', () => this.onInternetConnectionChange('offline'))
  }
}
