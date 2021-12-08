import { SupportedNetworks } from './constants'

type ContractAddresses = {
  [key in SupportedNetworks]?: string
}

export type SupportedContractName = 'USDC' | 'CONTRIB_BUCKET_FACTORY' | 'BUCKET'

export type SupportedErc20Token = 'USDC'

export type SupportedContractAddresses = {
  [key in SupportedContractName]: ContractAddresses
}

export const CONTRIB_BUCKET_FACTORY_ADDRESSES: ContractAddresses = {
  localhost: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  goerli: '0x32816Eb67c4b2b32BD50A3440D65C9A335F5C944',
  rinkeby: '0x39Bb4281d3Fe3579c592d7420602dA5A01A886E6',
}

// should this be in the config?
export const BUCKET_ADDRESSES: ContractAddresses = {
  localhost: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  goerli: '0x32816Eb67c4b2b32BD50A3440D65C9A335F5C944',
}

export const USDC_ADDRESSES: ContractAddresses = {
  mainnet: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  ropsten: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
  goerli: '0xaFF4481D10270F50f203E0763e2597776068CBc5',
}

export const supportedContracts: SupportedContractAddresses = {
  USDC: USDC_ADDRESSES,
  CONTRIB_BUCKET_FACTORY: CONTRIB_BUCKET_FACTORY_ADDRESSES,
  BUCKET: BUCKET_ADDRESSES,
}

export const getContractAddress = (
  contract: SupportedContractName,
  currentNetwork: SupportedNetworks
): string | undefined => {
  const supportedContract = supportedContracts[contract]
  return supportedContract[currentNetwork]
}
