import rimraf from 'rimraf'
import { paths } from '../packages/hardhat/scripts/build-utils'

const deleteDirectory = (path: string): void => {
  rimraf(path, () => console.log(`Deleted: ${path}`))
}

const cleanFrontendGeneratedFiles = (): void => {
  console.log('Cleaning Frontend Generated files...')
  deleteDirectory(paths.EXPORTED_GENERATED__DIR)
}

const cleanHardHatGeneratedFiles = (): void => {
  console.log('Cleaning HardHat Generated files...')
  const hardHatArtifactsDirPath = `${paths.EXPORTED_HARDHAT_DIR}/artifacts`
  const hardHatCacheDirPath = `${paths.EXPORTED_HARDHAT_DIR}/cache`
  const hardHatDeploymentsDirPath = `${paths.EXPORTED_HARDHAT_DIR}/deployments`
  deleteDirectory(hardHatArtifactsDirPath)
  deleteDirectory(hardHatCacheDirPath)
  deleteDirectory(hardHatDeploymentsDirPath)
}

const cleanSubgraphGeneratedFiles = (): void => {
  console.log('Cleaning Subgraph Generated files...')
  const subgraphRootDirPath = `${__dirname}/packages/subgraph`
  const subgraphAbisDirPath = `${subgraphRootDirPath}/abis`
  const subgraphConfigDirPath = `${subgraphRootDirPath}/config`
  deleteDirectory(subgraphAbisDirPath)
  deleteDirectory(subgraphConfigDirPath)
}

const init = (): void => {
  cleanHardHatGeneratedFiles()
  // cleanSubgraphGeneratedFiles()
  cleanFrontendGeneratedFiles()
}

init()
