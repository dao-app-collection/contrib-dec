import { folderExists, paths } from './build-utils'

const main = (): void => {
  folderExists(paths.EXPORTED_GENERATED__DIR)
  folderExists(paths.EXPORTED_GENERATED_CONTRACTS_DIR)
}

main()
