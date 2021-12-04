const { expect } = require('chai')
const { ethers, deployments } = require('hardhat')
const { createBucket } = require('./helpers')

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

    await expect(
      await BucketFactory.connect(owner).createBucket(
        [owner.address],
        'dev',
        Token.address,
        '0x0000000000000000000000000000000000000000'
      )
    ).to.emit(BucketFactory, 'BucketCreated')
  })

  it('Should create a subbucket', async function () {
    const [owner] = await ethers.getSigners()

    const parentBucket = await createBucket(
      [owner.address],
      'dev',
      Token.address,
      '0x0000000000000000000000000000000000000000',
      owner
    )

    const childBucket = await createBucket(
      [owner.address],
      'dev-child',
      Token.address,
      parentBucket.address,
      owner
    )

    await expect(await childBucket.parent()).to.equal(parentBucket.address)
  })

  it('Should fund a bucket', async function () {
    const [owner] = await ethers.getSigners()

    //  create bucket
    const Bucket = await createBucket(
      [owner.address],
      'dev',
      Token.address,
      '0x0000000000000000000000000000000000000000',
      owner
    )

    // approve token spend
    await Token.approve(Bucket.address, 100)

    // fund bucket
    const fundTx = Bucket.fundBucket(100)

    expect(fundTx).to.emit('Transfer').withArgs({
      from: owner.address,
      to: Bucket.address,
      amount: 100,
    })

    expect(await Bucket.balance()).to.equal('100')
  })
})
