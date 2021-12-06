import { UiStore } from './UiStore'
import { Web3Store } from './Web3Store'
import { MulticallStore } from './MulticallStore'
import LocalStorageStore from './LocalStorageStore'
import { Erc20Store } from './entities/Erc20.entity'
import { BrowserStore } from './BrowserStore'
import { ClockStore } from './ClockStore'
import { ContribBucketFactoryContractStore } from './ContribBucketFactoryContractStore'
import { BucketStore } from './BucketStore'

export class RootStore {
  uiStore: UiStore
  browserStore: BrowserStore
  clockStore: ClockStore
  web3Store: Web3Store
  contribBucketFactoryContractStore: ContribBucketFactoryContractStore
  multicallStore: MulticallStore
  localStorageStore: LocalStorageStore
  usdcStore: Erc20Store
  bucketStore: BucketStore

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(toast: any) {
    this.localStorageStore = new LocalStorageStore(this)
    this.uiStore = new UiStore(this, toast)
    this.browserStore = new BrowserStore(this)
    this.clockStore = new ClockStore(this)
    this.web3Store = new Web3Store(this)
    this.contribBucketFactoryContractStore = new ContribBucketFactoryContractStore(this)
    this.bucketStore = new BucketStore(this)
    this.multicallStore = new MulticallStore(this)
    this.usdcStore = new Erc20Store(this, 'USDC', 'usdcStore')
  }
}
