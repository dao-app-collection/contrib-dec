pragma solidity >=0.5.12;

//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "./Bucket.sol";
import "./standard-bounties/StandardBounties.sol";
import '@openzeppelin/contracts/ownership/Ownable.sol';

contract BucketFactory is Ownable {

  event BucketCreated(address bucket, string name, string data);

    StandardBounties public standardBounties;

    constructor(StandardBounties _standardBounties) public {
        standardBounties = _standardBounties;
    }

    function setStandardBounties(StandardBounties _standardBounties) public onlyOwner {
        standardBounties = _standardBounties;
    }

    function createBucket(
        address[] memory _owners,
        string memory _name,
        string memory _data,
        ERC20 _token,
        Bucket _parent
    ) public {
        Bucket bucket = new Bucket(
            _owners,
            _token,
            _parent,
            standardBounties
        );

        emit BucketCreated(address(bucket), _name, _data);
    }
}
