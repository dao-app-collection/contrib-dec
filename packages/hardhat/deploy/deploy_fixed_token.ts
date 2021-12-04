import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import chalk from 'chalk'

const name = 'FixedToken'

const func: DeployFunction = async ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  const deployResult = await deploy(name, {
    from: deployer,
  })

  deployments.log(' 📄', chalk.cyan(name), 'deployed to:', chalk.magenta(deployResult.address))
}

export default func

func.tags = [name, 'all']
