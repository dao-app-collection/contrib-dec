import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import chalk from 'chalk'
import hre from 'hardhat'

const name = 'BucketFactory'

const func: DeployFunction = async ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  // rinkeby address
  let standardBountiesAddress = '0x6ac6baf770b3ffe2ddb3c5797e47c17cebef2ec4'

  if (hre.network.name === 'hardhat') {
    await deploy('FixedToken', {
      from: deployer,
    })

    const sbResult = await deploy('StandardBounties', {
      from: deployer,
    })

    standardBountiesAddress = sbResult.address
  }

  const deployResult = await deploy('BucketFactory', {
    from: deployer,
    args: [standardBountiesAddress],
  })

  deployments.log(' 📄', chalk.cyan(name), 'deployed to:', chalk.magenta(deployResult.address))
}

export default func

func.tags = [name, 'all']
