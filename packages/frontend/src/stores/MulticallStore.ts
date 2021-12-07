import deepEqual from 'fast-deep-equal'
import cloneDeep from 'clone-deep'
import { autorun, makeAutoObservable, runInAction, toJS } from 'mobx'
import { Multicall, ContractCallContext, ContractCallReturnContext } from 'ethereum-multicall'
import { ethers } from 'ethers'
import { CallContext } from 'ethereum-multicall/dist/esm/models'
import { RootStore } from './RootStore'

function sameMethodAndParams(call0: CallContext, call1: CallContext): boolean {
  return (
    call0.methodName === call1.methodName &&
    JSON.stringify(call0.methodParameters) === JSON.stringify(call1.methodParameters)
  )
}

function generateUniqueCallId(context: ContractCallContext): string {
  return `${context.reference}${context.calls[0].methodName}${JSON.stringify(
    context.calls[0].methodParameters
  )}`
}

// Multicall returns different bignumber implementation as ethers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeMulticallReturnValues(values: any[]): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalizedValues = values.map((value: any) => {
    if (typeof value === 'object' && value !== null && value.type === 'BigNumber') {
      return ethers.BigNumber.from(value.hex)
    }
    return value
  })

  // If this is a return type containing multiple values, wrap it in another
  // array to match the ethers return value
  if (values.length > 1) return [normalizedValues]

  return normalizedValues
}

export class MulticallStore {
  root: RootStore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contractCallContexts: ContractCallContext<{ cb: (res: any) => void }>[] = []
  activeCalls: Set<string> = new Set()
  multicall?: Multicall

  constructor(root: RootStore) {
    this.root = root
    makeAutoObservable(this, { contractCallContexts: false })
    this.init()
  }

  init(): void {
    autorun(() => {
      this.multicall = new Multicall({
        ethersProvider: this.root.web3Store.coreProvider as any,
        tryAggregate: true,
      })
    })
  }

  call(): void {
    runInAction(() => {
      if (!this.multicall) throw Error('multicall must be initialized')
      this.multicall.call(cloneDeep(this.contractCallContexts)).then((results) => {
        Object.values(results).forEach((res) => {
          Object.entries(res).forEach(([store, val]) => {
            console.log('multicalls', { res, store, val })
            const rootKey = store as keyof RootStore
            const typedVal = val as ContractCallReturnContext
            runInAction(() => {
              if (this.root[rootKey]) {
                const targetStore = this.root[rootKey]
                typedVal.callsReturnContext.forEach((call) => {
                  const { methodName } = call
                  const paramStr = JSON.stringify(call.methodParameters)
                  const normalizedReturnValues = normalizeMulticallReturnValues(call.returnValues)
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  const curReturnValues = toJS(targetStore.storage[methodName][paramStr])
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  if (deepEqual(curReturnValues, normalizedReturnValues)) return
                  console.log('new value!!!', {
                    curReturnValues,
                    normalizedReturnValues,
                    storage: targetStore.storage,
                    methodName,
                    paramStr,
                  })
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  targetStore.storage[methodName][paramStr] = normalizedReturnValues
                })
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

    // Get contract reference space to add call to
    const contractIndex = this.contractCallContexts.findIndex(
      (_context) => _context.reference === context.reference
    )

    // If no contract reference space exists, push whole thing
    if (contractIndex === -1) {
      this.contractCallContexts.push(context)
    } else {
      // Otherwise just push call to existing reference space
      this.contractCallContexts[contractIndex].calls.push(context.calls[0])
    }

    // Watch call
    this.activeCalls.add(uniqueCallId)
  }

  removeCall(contextToRemove: ContractCallContext): void {
    const uniqueCallIdToRemove = generateUniqueCallId(contextToRemove)
    this.activeCalls.delete(uniqueCallIdToRemove)

    // Get call to remove, and the contract reference it's stored at
    const callToRemove = contextToRemove.calls[0]
    const contractIndex = this.contractCallContexts.findIndex(
      (_context) => _context.reference === contextToRemove.reference
    )

    // Remove the call
    this.contractCallContexts[contractIndex].calls = this.contractCallContexts[
      contractIndex
    ].calls.filter((_call) => !sameMethodAndParams(_call, callToRemove))
  }
}
