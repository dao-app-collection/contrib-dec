pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "./Bucket.sol";

contract BucketFactory {

  event BucketCreated(address _bucket);

  constructor() {
  }

  function createBucket(address[] memory _owners, string memory _name, Bucket _parent) public {
    Bucket bucket = new Bucket(
        _owners,
        _name,
        _parent
    );

    emit BucketCreated(address(bucket));
  }

}
