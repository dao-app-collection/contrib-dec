import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import chalk from 'chalk'

const name = 'BucketFactory'

const func: DeployFunction = async ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  // TODO: update to reuse existing SB when not on local
  const sbResult = await deploy('StandardBounties', {
    from: deployer,
  })

  const deployResult = await deploy('BucketFactory', {
    from: deployer,
    args: [sbResult.address],
  })

  deployments.log(' 📄', chalk.cyan(name), 'deployed to:', chalk.magenta(deployResult.address))
}

export default func

func.tags = [name, 'all']
