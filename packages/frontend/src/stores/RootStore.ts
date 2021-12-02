import { Toast } from '@geist-ui/react'
import { UiStore } from './UiStore'
import { Web3Store } from './Web3Store'
import { UniswapV2RouterContractStore } from './UniswapV2RouterContractStore'
import { MulticallStore } from './MulticallStore'
import LocalStorageStore from './LocalStorageStore'
import { Erc20Store } from './entities/Erc20.entity'
import { BrowserStore } from './BrowserStore'
import { ClockStore } from './ClockStore'

export class RootStore {
  uiStore: UiStore
  browserStore: BrowserStore
  clockStore: ClockStore
  web3Store: Web3Store
  uniswapV2RouterContractStore: UniswapV2RouterContractStore
  multicallStore: MulticallStore
  localStorageStore: LocalStorageStore
  usdcStore: Erc20Store

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(toast: any) {
    this.uiStore = new UiStore(this, toast)
    this.browserStore = new BrowserStore(this)
    this.clockStore = new ClockStore(this)
    this.web3Store = new Web3Store(this)
    this.uniswapV2RouterContractStore = new UniswapV2RouterContractStore(this)
    this.multicallStore = new MulticallStore(this)
    this.localStorageStore = new LocalStorageStore(this)
    this.usdcStore = new Erc20Store(this, 'USDC', 'usdcStore')
  }
}
