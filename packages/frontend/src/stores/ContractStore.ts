import { ContractCallContext } from 'ethereum-multicall'
import { action, makeObservable, observable, onBecomeUnobserved, runInAction } from 'mobx'
import { Contract, ContractFunction, BigNumber, UnsignedTransaction } from 'ethers'
import { RootStore } from './RootStore'
import { Abi, ContractReturn, Factory, Storage, TransactionReceipt } from './utils/class-utils'
import { getContractAddress, SupportedContractName } from '../lib/supported-contracts'

type CallOptions = {
  subscribe: boolean
}

type GasOptions = { gasLimit: BigNumber; gasPrice?: BigNumber }

export class ContractStore {
  contractName: SupportedContractName | undefined
  contractAddress: string | undefined
  storeKey: keyof RootStore
  address?: string
  root: RootStore
  contract?: Contract
  abi: Abi
  factory: Factory
  storage: Storage

  constructor({
    root,
    contractName,
    contractAddress,
    storeKey,
    factory,
  }: {
    root: RootStore
    contractName?: SupportedContractName
    contractAddress?: string
    storeKey: keyof RootStore & string
    factory: Factory
  }) {
    this.root = root
    this.contractName = contractName
    this.contractAddress = contractAddress
    this.storeKey = storeKey
    this.factory = factory
    this.abi = factory.abi
    this.storage = {}
    makeObservable(this, {
      storage: observable,
      init: action,
      call: observable,
      sendTransaction: observable,
      getWriteContract: action,
      generateGasOptions: action,
    })

    const rootStoreKeys = Object.entries(this.root).map(([key]) => key)
    const isEntity = !rootStoreKeys.includes(this.storeKey)

    if (isEntity) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.root[storeKey] = this
    }

    this.init()
  }

  init(): void {
    const network = this.root.web3Store.network.name
    const address =
      this.contractAddress ?? (this.contractName && getContractAddress(this.contractName, network))

    if (typeof address === 'undefined') {
      // throw Error(`no address for ${this.contractName} on ${network}`)
      return
    }
    this.address = address
    this.contract = this.factory.connect(this.address, this.root.web3Store.coreProvider)

    console.log('init contract', { address: this.address, contract: this.contract })
  }

  async sendTransaction<T extends ContractFunction>(
    methodName: string,
    params: Parameters<T>,
    callerOptions: UnsignedTransaction = {}
  ): Promise<{ hash: string; wait: () => Promise<TransactionReceipt> }> {
    // Estimate gasLimit and build tx options
    const gasOptions = await this.generateGasOptions(methodName, params, callerOptions)
    const options = { ...gasOptions, ...callerOptions }

    // Craft and send the tx with the signer
    await this.root.web3Store.checkSigner()
    const writeContract = this.getWriteContract()
    const { hash } = await writeContract[methodName](...params, options)

    // Wait for tx to resolve with the coreProvider (signer can be seconds slower than coreProvider)
    return { hash, wait: (): Promise<TransactionReceipt> => this.root.web3Store.wait(hash) }
  }

  getWriteContract(): Contract {
    if (!this.contract || !this.root.web3Store.signer || !this.address)
      throw Error('contract not initialized or no signer')
    return this.factory.connect(this.address, this.root.web3Store.signer)
  }

  generateGasOptions<T extends ContractFunction>(
    methodName: string,
    params: Parameters<T>,
    callerOptions: UnsignedTransaction = {}
  ): Promise<GasOptions> {
    if (!this.contract) throw Error('contract not initialized')

    const estimateOptions = { from: this.root.web3Store.signerState.address, ...callerOptions }

    return this.contract.estimateGas[methodName](...params, estimateOptions).then(
      (gasLimitEstimate) => {
        const options: GasOptions = {
          gasLimit: gasLimitEstimate.mul(2),
        }
        runInAction(() => {
          if (this.root.web3Store.network.gasPrice !== undefined)
            options.gasPrice = this.root.web3Store.network.gasPrice
        })
        return options
      }
    )
  }

  async call<T extends ContractFunction>(
    methodName: string,
    params: Parameters<T>,
    options: CallOptions = { subscribe: true }
  ): Promise<ContractReturn<T> | undefined> {
    const paramStr = JSON.stringify(params)

    // Init storageProperty if required
    runInAction(() => {
      if (!this.storage[methodName]) this.storage[methodName] = {}
    })

    // If cached, return cached
    const cur = this.storage[methodName][paramStr]
    console.log('calling call', { methodName, params, cur, storage: this.storage, self: this })
    if (cur !== undefined) return cur

    // Make first call to SC to get the value
    if (!this.contract) return undefined
    const res: ContractReturn<T> = await this.contract.functions[methodName](...params)
    runInAction(() => {
      // Set the value
      this.storage[methodName][paramStr] = res

      if (options.subscribe) {
        // Automatically get updates for this value with the multicall,
        // and set up removing the call when this call becomes unobserved
        if (!this.address) throw Error(`contract ${this.contractName} not initialized`)
        const call: ContractCallContext = {
          reference: this.storeKey,
          contractAddress: this.address,
          abi: this.abi,
          calls: [{ reference: methodName, methodName, methodParameters: params }],
        }

        console.log({
          methodName,
          res,
          params,
          storeKey: this.storeKey,
          storage: this.storage,
          self: this,
        })

        this.root.multicallStore.addCall(call)
        onBecomeUnobserved(this.storage[methodName], paramStr, () => {
          runInAction(() => {
            this.root.multicallStore.removeCall(call)
            delete this.storage[methodName][paramStr]
          })
        })
      }
    })

    return res
  }
}
