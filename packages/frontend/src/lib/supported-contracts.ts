import { SupportedNetworks } from './constants'

type ContractAddresses = {
  [key in SupportedNetworks]?: string
}

export type SupportedContractName = 'USDC' | 'UNISWAP_V2_ROUTER'

export type SupportedErc20Token = 'USDC'

export type SupportedContractAddresses = {
  [key in SupportedContractName]: ContractAddresses
}

export const UNISWAP_V2_ROUTER_ADDRESSES: ContractAddresses = {
  mainnet: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  goerli: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
}

export const USDC_ADDRESSES: ContractAddresses = {
  mainnet: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  ropsten: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
  goerli: '0xaFF4481D10270F50f203E0763e2597776068CBc5',
}

export const supportedContracts: SupportedContractAddresses = {
  USDC: USDC_ADDRESSES,
  UNISWAP_V2_ROUTER: UNISWAP_V2_ROUTER_ADDRESSES,
}

export const getContractAddress = (
  contract: SupportedContractName,
  currentNetwork: SupportedNetworks
): string | undefined => {
  const supportedContract = supportedContracts[contract]
  return supportedContract[currentNetwork]
}
