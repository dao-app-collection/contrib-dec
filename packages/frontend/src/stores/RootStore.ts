import { UiStore } from './UiStore'
import { Web3Store } from './Web3Store'
import { UniswapV2RouterContractStore } from './UniswapV2RouterContractStore'
import { MulticallStore } from './MulticallStore'
import LocalStorageStore from './LocalStorageStore'
import { Erc20Store } from './entities/Erc20.entity'
import { BrowserStore } from './BrowserStore'
import { ClockStore } from './ClockStore'
import { SwapStore } from '../features/swap/SwapStore'

export class RootStore {
  uiStore: UiStore
  browserStore: BrowserStore
  clockStore: ClockStore
  swapStore: SwapStore
  web3Store: Web3Store
  uniswapV2RouterContractStore: UniswapV2RouterContractStore
  multicallStore: MulticallStore
  localStorageStore: LocalStorageStore
  usdcStore: Erc20Store

  constructor() {
    this.uiStore = new UiStore(this)
    this.browserStore = new BrowserStore(this)
    this.clockStore = new ClockStore(this)
    this.swapStore = new SwapStore(this)
    this.web3Store = new Web3Store(this)
    this.uniswapV2RouterContractStore = new UniswapV2RouterContractStore(this)
    this.multicallStore = new MulticallStore(this)
    this.localStorageStore = new LocalStorageStore(this)
    this.usdcStore = new Erc20Store(this, 'USDC', 'usdcStore')
  }
}
