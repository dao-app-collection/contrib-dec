/* eslint-disable no-console */
import { makeObservable, observable, runInAction } from 'mobx'
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
    storeKey: any & keyof RootStore
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
      formattedSignerBalance: observable,
      transfer: observable,
      balanceOfSigner: observable,
      decimalsNumber: observable,
      signerAllowance: observable,
      needsToAllowTokens: observable,
      signerNeedsMoreTokens: observable,
    })
  }

  symbol(): Promise<ContractReturn<TokenSymbol>> {
    return this.call<TokenSymbol>('symbol', [], { subscribe: false })
  }

  decimals(): Promise<ContractReturn<Decimals>> {
    return this.call<Decimals>('decimals', [], { subscribe: false })
  }

  allowance(...params: Parameters<Allowance>): Promise<ContractReturn<Allowance>> {
    return this.call<Allowance>('allowance', params)
  }

  balanceOf(...params: Parameters<BalanceOf>): Promise<ContractReturn<BalanceOf>> {
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

  async signerAllowance(spenderAddress: string): Promise<BigNumber | undefined> {
    const { address: signerAddress } = this.root.web3Store.signerState
    if (!signerAddress) return undefined
    const allowanceRes = await this.allowance(signerAddress, spenderAddress)
    if (allowanceRes === undefined) return undefined
    const [allowance] = allowanceRes
    return allowance
  }

  async balanceOfSigner(): Promise<BigNumber | undefined> {
    const { address } = this.root.web3Store.signerState
    if (!address) return undefined
    const balanceRes = await this.balanceOf(address)
    if (balanceRes === undefined) return undefined
    const [balance] = balanceRes
    return balance
  }

  async symbolString(): Promise<string | undefined> {
    const symbolRes = await this.symbol()
    if (symbolRes === undefined) return undefined
    return symbolRes[0]
  }

  async decimalsString(): Promise<string | undefined> {
    const decimalsRes = await this.decimals()
    if (decimalsRes === undefined) return undefined
    const [decimals] = decimalsRes
    return decimals.toString()
  }

  async decimalsNumber(): Promise<number | undefined> {
    const { address } = this.root.web3Store.signerState
    if (!address) return undefined
    const decimalsRes = await this.decimals()
    if (decimalsRes === undefined) return undefined
    const [decimals] = decimalsRes
    return decimals
  }

  async formattedSignerBalance(): Promise<string | undefined> {
    const { address } = this.root.web3Store.signerState
    if (!address) return undefined
    const decimalsRes = await this.decimals()
    const balanceRes = await this.balanceOf(address)
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

  async needsToAllowTokens(
    address: string | undefined,
    amount: BigNumber | undefined
  ): Promise<boolean | undefined> {
    if (!amount) return undefined
    if (!address) return undefined
    const allowance = await this.signerAllowance(address)
    if (allowance === undefined || amount === undefined) return undefined
    return allowance.lt(amount)
  }

  async signerNeedsMoreTokens(amount: BigNumber | undefined): Promise<boolean | undefined> {
    if (!amount) return undefined
    const balanceOfSigner = await this.balanceOfSigner()
    if (!balanceOfSigner) return undefined
    return balanceOfSigner?.lt(amount)
  }
}
