import { ethers, deployments } from 'hardhat'

export async function createBucket(owners, name, data, tokenAddress, parentAddress, signer) {
  const bucketFactory = await deployments.get('BucketFactory')
  const BucketFactory = await ethers.getContractAt('BucketFactory', bucketFactory.address)

  const abi = (await deployments.get('BucketFactory')).abi
  const iface = new ethers.utils.Interface(abi)
  const parentTx = await BucketFactory.connect(signer).createBucket(
    owners,
    name,
    data,
    tokenAddress,
    parentAddress
  )
  const receipt = await parentTx.wait()
  const log = iface.parseLog(receipt.events.find((event) => event.event === 'BucketCreated'))

  return ethers.getContractAt('Bucket', log.args.bucket)
}
