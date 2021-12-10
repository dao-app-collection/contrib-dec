const { expect } = require('chai')
const { ethers, deployments } = require('hardhat')
const { createBucket } = require('./helpers')

describe('Bucket', function () {
  let BucketFactory
  let Token
  let StandardBounties

  beforeEach(async () => {
    await deployments.fixture(['all'])

    const bucketFactory = await deployments.get('BucketFactory')
    BucketFactory = await ethers.getContractAt('BucketFactory', bucketFactory.address)

    const token = await deployments.get('ContribTestToken')
    Token = await ethers.getContractAt('ContribTestToken', token.address)

    const standardBounties = await deployments.get('StandardBounties')
    StandardBounties = await ethers.getContractAt('StandardBounties', standardBounties.address)
  })

  it('Should create a bucket', async function () {
    const [owner] = await ethers.getSigners()

    await expect(
      await BucketFactory.connect(owner).createBucket(
        [owner.address],
        'dev',
        'this is the bucket data',
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
      'this is the bucket data',
      Token.address,
      '0x0000000000000000000000000000000000000000',
      owner
    )

    const childBucket = await createBucket(
      [owner.address],
      'dev-child',
      'this is the bucket data',
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
      'this is the bucket data',
      Token.address,
      '0x0000000000000000000000000000000000000000',
      owner
    )

    // approve token spend
    await Token.approve(Bucket.address, 100)

    // fund bucket
    const fundTx = Bucket.fundBucket(100)

    await expect(fundTx).to.emit(Token, 'Transfer').withArgs(owner.address, Bucket.address, 100)
  })

  it('should create a task', async function () {
    const [owner] = await ethers.getSigners()

    const Bucket = await createBucket(
      [owner.address],
      'dev',
      'this is the bucket data',
      Token.address,
      '0x0000000000000000000000000000000000000000',
      owner
    )

    const data = 'the ipfs hash'
    const deadline = Math.round(new Date().getTime() / 1000) + 86400000 // 1 day from now
    const issuers = [owner.address]
    const approvers = [owner.address]

    const createTaskTx = Bucket.createTask(data, deadline, issuers, approvers)

    await expect(createTaskTx).to.emit(StandardBounties, 'BountyIssued')

    await expect(createTaskTx)
      .to.emit(Bucket, 'TaskCreated')
      .withArgs(0, data, deadline, issuers, approvers)
  })

  it('should create and fund a task', async function () {
    const [owner] = await ethers.getSigners()

    const Bucket = await createBucket(
      [owner.address],
      'dev',
      'this is the bucket data',
      Token.address,
      '0x0000000000000000000000000000000000000000',
      owner
    )

    // approve token spend
    await Token.approve(Bucket.address, 100)

    // fund bucket
    await Bucket.fundBucket(100)

    const data = 'the ipfs hash'
    const deadline = Math.round(new Date().getTime() / 1000) + 86400000 // 1 day from now
    const issuers = [owner.address]
    const approvers = [owner.address]
    const depositAmount = 100

    const createAndFundTx = Bucket.createAndFundTask(
      data,
      deadline,
      issuers,
      approvers,
      depositAmount
    )

    await expect(createAndFundTx).to.emit(StandardBounties, 'ContributionAdded')

    await expect(createAndFundTx)
      .to.emit(Token, 'Transfer')
      .withArgs(Bucket.address, StandardBounties.address, depositAmount)
  })

  it('should increase funds of a task', async function () {
    const [owner] = await ethers.getSigners()

    const Bucket = await createBucket(
      [owner.address],
      'dev',
      'this is the bucket data',
      Token.address,
      '0x0000000000000000000000000000000000000000',
      owner
    )
    const depositAmount = 100

    // approve token spend
    await Token.approve(Bucket.address, depositAmount)

    // fund bucket
    await Bucket.fundBucket(depositAmount)

    const data = 'the ipfs hash'
    const deadline = Math.round(new Date().getTime() / 1000) + 86400000 // 1 day from now
    const issuers = [owner.address]
    const approvers = [owner.address]

    await Bucket.createAndFundTask(data, deadline, issuers, approvers, depositAmount)

    const taskId = 0
    const topupAmount = 100

    // approve token spend
    await Token.approve(Bucket.address, topupAmount)

    // fund bucket
    await Bucket.fundBucket(topupAmount)

    // fund bounty
    await Bucket.fundTask(taskId, topupAmount)

    await expect((await StandardBounties.bounties(taskId)).balance).to.equal(
      depositAmount + topupAmount
    )
  })

  it('should pay assignee on completeTask', async function () {
    const [owner, assignee] = await ethers.getSigners()

    const Bucket = await createBucket(
      [owner.address],
      'dev',
      'this is the bucket data',
      Token.address,
      '0x0000000000000000000000000000000000000000',
      owner
    )

    const depositAmount = 100
    // approve token spend
    await Token.approve(Bucket.address, depositAmount)
    // fund bucket
    await Bucket.fundBucket(depositAmount)
    // create task
    const data = 'the ipfs hash'
    const deadline = Math.round(new Date().getTime() / 1000) + 86400000 // 1 day from now
    const issuers = [owner.address]
    const approvers = [Bucket.address, owner.address]
    await Bucket.createAndFundTask(data, deadline, issuers, approvers, depositAmount)
    // complete task
    const taskId = 0
    const fulfillers = [assignee.address]
    const completionData = 'this is an ipfs for the details of the submission'
    const approverId = 0
    const tokenAmounts = [depositAmount]
    const completionTx = Bucket.completeTask(
      taskId,
      fulfillers,
      completionData,
      approverId,
      tokenAmounts
    )

    await expect(completionTx)
      .to.emit(StandardBounties, 'FulfillmentAccepted')
      .withArgs(taskId, 0, Bucket.address, [depositAmount])

    await expect(completionTx)
      .to.emit(Token, 'Transfer')
      .withArgs(StandardBounties.address, assignee.address, depositAmount)
  })

  it('should allocate funds to child bucket', async function () {
    const [owner, assignee] = await ethers.getSigners()

    const Bucket = await createBucket(
      [owner.address],
      'dev',
      'this is the bucket data',
      Token.address,
      '0x0000000000000000000000000000000000000000',
      owner
    )

    const depositAmount = 100
    // approve token spend
    await Token.approve(Bucket.address, depositAmount)
    // fund bucket
    await Bucket.fundBucket(depositAmount)

    const ChildBucket = await createBucket(
      [owner.address],
      'dev-child',
      'this is the bucket data',
      Token.address,
      Bucket.address,
      owner
    )

    await Bucket.allocateFunds(ChildBucket.address, depositAmount / 2)

    await expect(await Token.balanceOf(Bucket.address)).to.equal(depositAmount / 2)
    await expect(await Token.balanceOf(ChildBucket.address)).to.equal(depositAmount / 2)
  })
})
