/* eslint-disable no-console */
import { makeObservable, observable, runInAction, computed } from 'mobx'
import { utils, BigNumber } from 'ethers'
import { RootStore } from '../RootStore'
import { ContractStore } from '../ContractStore'
import { ContractReturn } from '../utils/class-utils'
import { SupportedErc20Token } from '../../lib/supported-contracts'
import { Erc20Abi, Erc20Abi__factory } from '../../types/ethers-contracts'

type TokenSymbol = Erc20Abi['functions']['symbol']
type BalanceOf = Erc20Abi['functions']['balanceOf']
type Decimals = Erc20Abi['functions']['decimals']
type Allowance = Erc20Abi['functions']['allowance']
type Approve = Erc20Abi['functions']['approve']
type Transfer = Erc20Abi['functions']['transfer']

export class Erc20Store extends ContractStore {
  transferring = false
  transferHash: string | undefined
  approving = false
  symbolOverride?: string

  constructor({
    root,
    tokenName,
    tokenAddress,
    storeKey,
    symbolOverride,
  }: {
    root: RootStore
    tokenName?: SupportedErc20Token
    tokenAddress?: string
    storeKey: keyof RootStore & string
    symbolOverride?: string
  }) {
    super({
      root,
      contractName: tokenName,
      contractAddress: tokenAddress,
      storeKey,
      factory: Erc20Abi__factory,
    })
    if (symbolOverride) this.symbolOverride = symbolOverride
    makeObservable(this, {
      transferring: observable,
      transferHash: observable,
      approving: observable,
      symbol: observable,
      decimals: observable,
      allowance: observable,
      balanceOf: observable,
      approve: observable,
      formattedSignerBalance: computed,
      transfer: observable,
      balanceOfSigner: computed,
      decimalsNumber: computed,
      signerAllowance: observable,
      needsToAllowTokens: observable,
      signerNeedsMoreTokens: observable,
    })
  }

  symbol(): ContractReturn<TokenSymbol> {
    return this.call<TokenSymbol>('symbol', [], { subscribe: false })
  }

  decimals(): ContractReturn<Decimals> {
    return this.call<Decimals>('decimals', [], { subscribe: false })
  }

  allowance(...params: Parameters<Allowance>): ContractReturn<Allowance> {
    return this.call<Allowance>('allowance', params)
  }

  balanceOf(...params: Parameters<BalanceOf>): ContractReturn<BalanceOf> {
    return this.call<BalanceOf>('balanceOf', params)
  }

  async transfer(...params: Parameters<Transfer>): Promise<boolean> {
    try {
      runInAction(() => {
        this.transferring = true
      })
      const { hash, wait } = await this.sendTransaction<Transfer>('transfer', params)
      runInAction(() => {
        this.transferHash = hash
      })
      await wait()
      return true
    } catch (error) {
      this.root.uiStore.errorToast(`Error calling transfer`, error)
      return false
    } finally {
      runInAction(() => {
        this.transferring = false
      })
    }
  }

  signerAllowance(spenderAddress: string): BigNumber | undefined {
    const { address: signerAddress } = this.root.web3Store.signerState
    if (!signerAddress) return undefined
    const allowanceRes = this.allowance(signerAddress, spenderAddress)
    if (allowanceRes === undefined) return undefined
    const [allowance] = allowanceRes
    return allowance
  }

  get balanceOfSigner(): BigNumber | undefined {
    const { address } = this.root.web3Store.signerState
    if (!address) return undefined
    const balanceRes = this.balanceOf(address)
    if (balanceRes === undefined) return undefined
    const [balance] = balanceRes
    return balance
  }

  get symbolString(): string | undefined {
    const symbolRes = this.symbol()
    if (symbolRes === undefined) return undefined
    return symbolRes[0]
  }

  get decimalsString(): string | undefined {
    const decimalsRes = this.decimals()
    if (decimalsRes === undefined) return undefined
    const [decimals] = decimalsRes
    return decimals.toString()
  }

  get decimalsNumber(): number | undefined {
    const { address } = this.root.web3Store.signerState
    if (!address) return undefined
    const decimalsRes = this.decimals()
    if (decimalsRes === undefined) return undefined
    const [decimals] = decimalsRes
    return decimals
  }

  get formattedSignerBalance(): string | undefined {
    const { address } = this.root.web3Store.signerState
    if (!address) return undefined
    const decimalsRes = this.decimals()
    const balanceRes = this.balanceOf(address)
    if (decimalsRes === undefined || balanceRes === undefined) return undefined
    const [decimals] = decimalsRes
    const [balance] = balanceRes
    return utils.formatUnits(balance, decimals)
  }

  async approve(...params: Parameters<Approve>): Promise<void> {
    try {
      runInAction(() => {
        this.approving = true
      })
      const { wait } = await this.sendTransaction<Approve>('approve', params)
      await wait()
    } catch (e) {
      this.root.uiStore.errorToast('Approval error', e)
    } finally {
      runInAction(() => {
        this.approving = false
      })
    }
  }

  needsToAllowTokens(
    address: string | undefined,
    amount: BigNumber | undefined
  ): boolean | undefined {
    if (!amount) return undefined
    if (!address) return undefined
    const allowance = this.signerAllowance(address)
    if (allowance === undefined || amount === undefined) return undefined
    return allowance.lt(amount)
  }

  signerNeedsMoreTokens(amount: BigNumber | undefined): boolean | undefined {
    if (!amount) return undefined
    if (!this.balanceOfSigner) return undefined
    return this.balanceOfSigner?.lt(amount)
  }
}
