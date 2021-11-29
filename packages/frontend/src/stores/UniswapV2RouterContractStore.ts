import { makeObservable, observable, runInAction } from 'mobx'
import { RootStore } from './RootStore'
import { ContractStore } from './ContractStore'
import { ContractReturn } from './utils/class-utils'
import { UniswapV2RouterAbi as UniswapV2Router, UniswapV2RouterAbi__factory } from '../generated'

type GetAmountsOut = UniswapV2Router['functions']['getAmountsOut']
type RemoveLiquidity = UniswapV2Router['functions']['removeLiquidity']

export class UniswapV2RouterContractStore extends ContractStore {
  removingLiquidity: boolean

  constructor(root: RootStore) {
    super(root, 'UNISWAP_V2_ROUTER', 'uniswapV2RouterContractStore', UniswapV2RouterAbi__factory)
    this.removingLiquidity = false
    makeObservable(this, {
      removingLiquidity: observable,
      removeLiquidity: observable,
      getAmountsOut: observable,
    })
  }

  getAmountsOut(...params: Parameters<GetAmountsOut>): ContractReturn<GetAmountsOut> {
    return this.call<GetAmountsOut>('getAmountsOut', params)
  }

  async removeLiquidity(...params: Parameters<RemoveLiquidity>): Promise<boolean> {
    try {
      runInAction(() => {
        this.removingLiquidity = true
      })
      await this.sendTransaction<RemoveLiquidity>('removeLiquidity', params)
      return true
    } catch (error) {
      this.root.uiStore.errorToast(`Error calling removeLiquidity`, error)
      return false
    } finally {
      runInAction(() => {
        this.removingLiquidity = false
      })
    }
  }
}
