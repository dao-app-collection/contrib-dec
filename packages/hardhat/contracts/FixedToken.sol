pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import 'hardhat/console.sol';

// import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract FixedToken is ERC20 {
  constructor() ERC20('Fixed Token', 'FTK') {
    _mint(msg.sender, 1000000000000000000000); // 1000 tokens
  }
}
