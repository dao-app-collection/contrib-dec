const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Tokens', function () {
  it('Should deploy the token', async function () {
    const [owner] = await ethers.getSigners()

    const token = await ethers.getContractFactory('ContribTestToken')

    const Token = await token.deploy('contribTest', 'cbt', 18)

    await expect(await Token.name()).to.equal('contribTest')
    await expect(await Token.symbol()).to.equal('cbt')
    await expect(await Token.decimals()).to.equal(18)
    await expect(await Token.balanceOf(owner.address)).to.equal('1000000000000000000000')
  })

  it('Should mint the token', async function () {
    const [owner] = await ethers.getSigners()

    const token = await ethers.getContractFactory('ContribTestToken')

    const Token = await token.deploy('contribTest', 'cbt', 18)

    await Token.mint('1000000000000000000000')

    await expect(await Token.totalSupply()).to.equal('2000000000000000000000')
    await expect(await Token.balanceOf(owner.address)).to.equal('2000000000000000000000')
  })
})
