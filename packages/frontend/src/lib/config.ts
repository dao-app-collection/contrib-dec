import { SupportedNetworks } from './constants'

const config = {
  NETWORK: (process.env.NEXT_PUBLIC_NETWORK as unknown as SupportedNetworks) ?? 'rinkeby',
  ENVIRONMENT: process.env.ENVIRONMENT ?? 'dev',
  ROUNDED_DECIMALS: 4,
  CONFIG_CAT_SDK_KEY: '',
  SITE_URL: process.env.SITE_URL ?? 'https://hackaton.contrib.at/',
}

const appConfig = {
  isProduction: config.ENVIRONMENT === 'production',
}

export default { ...config, ...appConfig }
