import { SupportedNetworks } from './constants'

const config = {
  NETWORK: (process.env.NEXT_PUBLIC_NETWORK as unknown as SupportedNetworks) ?? 'rinkeby',
  ENVIRONMENT: process.env.ENVIRONMENT ?? 'dev',
  ROUNDED_DECIMALS: 4,
  CONFIG_CAT_SDK_KEY: 'xYjZCIkJi0eABaTu6QgigA/c-u2N7zb0EGnXQhvsjdsnQ',
  SITE_URL: process.env.SITE_URL ?? 'https://www.example.com/',
}

const appConfig = {
  isProduction: config.ENVIRONMENT === 'production',
}

export default { ...config, ...appConfig }
