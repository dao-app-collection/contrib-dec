const { expect } = require('chai')
const { ethers, deployments } = require('hardhat')

describe('Bucket', function () {
  let BucketFactory
  let Token

  beforeEach(async () => {
    await deployments.fixture(['all'])

    const bucketFactory = await deployments.get('BucketFactory')
    BucketFactory = await ethers.getContractAt('BucketFactory', bucketFactory.address)

    const token = await deployments.get('FixedToken')
    Token = await ethers.getContractAt('FixedToken', token.address)
  })

  it('Should create a bucket', async function () {
    const [owner] = await ethers.getSigners()

    // todo: fix parent
    await expect(
      await BucketFactory.connect(owner).createBucket(
        [owner.address],
        'dev',
        '0x0000000000000000000000000000000000000000'
      )
    ).to.emit(BucketFactory, 'BucketCreated')
  })

  it('Should create a subbucket', async function () {
    // const [owner] = await ethers.getSigners()
    // const abi = (await deployments.get('BucketFactory')).abi
    // const iface = new ethers.utils.Interface(abi)
    // const parentTx = await BucketFactory.connect(owner).createBucket(
    //   [owner.address],
    //   'dev',
    //   '0x0000000000000000000000000000000000000000'
    // )
    // const parentReceipt = await parentTx.wait()
    // const parentLog = iface.parseLog(parentReceipt.logs[0])
    // const { bucket: parentBucket } = parentLog.args
    // const childTx = await BucketFactory.connect(owner).createBucket(
    //   [owner.address],
    //   'dev-child',
    //   parentBucket
    // )
    // const childReceipt = await childTx.wait()
    // const childLog = iface.parseLog(childReceipt.logs[0])
    // const { bucket: childBucket } = childLog.args
    // const Bucket = await ethers.getContractAt('Bucket', childBucket)
    // await expect(await Bucket.parent()).to.equal(parentBucket)
  })
})
