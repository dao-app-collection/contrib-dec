import deepEqual from 'fast-deep-equal'
import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { Multicall, ContractCallContext, ContractCallReturnContext } from 'ethereum-multicall'
import { ethers } from 'ethers'
import { RootStore } from './RootStore'

function generateUniqueCallId(context: ContractCallContext): string {
  return `${context.reference}${context.calls[0].methodName}${JSON.stringify(
    context.calls[0].methodParameters
  )}`
}

// Multicall returns different bignumber implementation as ethers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeMulticallReturnValues(item: any): any {
  if (typeof item === 'object' && item.type === 'BigNumber') {
    return ethers.BigNumber.from(item.hex)
  }
  return item
}

export class MulticallStore {
  root: RootStore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calls: ContractCallContext<{ cb: (res: any) => void }>[] = []
  activeCalls: Set<string> = new Set()
  multicall?: Multicall

  constructor(root: RootStore) {
    this.root = root
    makeAutoObservable(this, { calls: false })
    this.init()
  }

  init(): void {
    this.multicall = new Multicall({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ethersProvider: this.root.web3Store.coreProvider as any,
      tryAggregate: true,
    })
  }

  call(): void {
    runInAction(() => {
      if (!this.multicall) throw Error('multicall must be initialized')
      this.multicall.call(this.calls).then((results) => {
        Object.values(results).forEach((res) => {
          Object.entries(res).forEach(([store, val]) => {
            const rootKey = store as keyof RootStore
            const typedVal = val as ContractCallReturnContext
            runInAction(() => {
              if (this.root[rootKey]) {
                const targetStore = this.root[rootKey]
                const call = typedVal.callsReturnContext[0]
                const targetStoreKey = call.reference
                const paramStr = JSON.stringify(call.methodParameters)
                const normalizedReturnValues = call.returnValues.map(normalizeMulticallReturnValues)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const curReturnValues = toJS(targetStore.storage[targetStoreKey][paramStr])
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (deepEqual(curReturnValues, normalizedReturnValues)) return
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                targetStore.storage[targetStoreKey][paramStr] = normalizedReturnValues
              }
            })
          })
        })
      })
    })
  }

  addCall(context: ContractCallContext): void {
    // Check if call is already watched
    const uniqueCallId = generateUniqueCallId(context)
    if (this.activeCalls.has(uniqueCallId)) return

    // Watch call
    this.calls.push(context)
    this.activeCalls.add(uniqueCallId)
  }

  removeCall(contextToRemove: ContractCallContext): void {
    const uniqueCallIdToRemove = generateUniqueCallId(contextToRemove)
    this.activeCalls.delete(uniqueCallIdToRemove)
    this.calls = this.calls.filter(
      (context) => generateUniqueCallId(context) !== uniqueCallIdToRemove
    )
  }
}
