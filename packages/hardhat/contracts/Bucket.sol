pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Bucket {

  string public name;
  address[] public owners;
  uint256 public balance;
  ERC20 public token;
  Bucket public parent;


  constructor(address[] memory _owners, string memory _name, Bucket _parent) {
    name = name;
    owners = _owners;
    parent = _parent;
  }

//   function fundBucket(ERC20 _token, uint256 _balance, ERC20 _token){

//   }


