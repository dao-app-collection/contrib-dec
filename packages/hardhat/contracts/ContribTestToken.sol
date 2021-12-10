pragma solidity >=0.5.12;
//SPDX-License-Identifier: MIT

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol';

import 'hardhat/console.sol';

// import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract ContribTestToken is ERC20, ERC20Detailed {
  constructor(string memory name, string memory symbol, uint8 decimals) 
    ERC20Detailed(name, symbol, decimals)
   public {
    _mint(msg.sender, 1000000000000000000000); // 1000 tokens
  }

  function mint(uint256 amount) external {
      _mint(msg.sender, amount);
  }
}
