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

    // todo: fix owner
    await expect(
      await BucketFactory.connect(owner).createBucket(
        [owner.address],
        'dev',
        '0x0000000000000000000000000000000000000000'
      )
    ).to.emit(BucketFactory, 'BucketCreated')
  })
})
