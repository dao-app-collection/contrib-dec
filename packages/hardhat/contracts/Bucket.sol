pragma solidity >=0.5.12;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/ownership/Ownable.sol';
import "./standard-bounties/StandardBounties.sol";

contract Bucket is Ownable {

    string public name;
    address[] public owners;
    uint256 public balance;
    ERC20 public token;
    Bucket public parent;
    StandardBounties public standardBounties;


    modifier onlyBucketOwners() {
        bool isSenderOwner = false;
        
        for(uint i = 0; i < owners.length; i++){
            if(owners[i] == msg.sender){
                isSenderOwner = true;
                break;
            } 
        }

        require(isSenderOwner, "Not a bucket owner");
        _;
    }

    constructor(address[] memory _owners, string memory _name, Bucket _parent) public {
        require(_owners.length > 0, "Bucket requires at least one owner");
        name = name;
        owners = _owners;
        parent = _parent;
    }

    function setStandardBounties(StandardBounties _standardBounties) public onlyOwner {
        standardBounties = _standardBounties;
    }

    // increase the balance of this bucket
    /// @param _token the address to ERC20 token that is being funded
    /// @param _amount the amount of tokens to send to the bucket
    function fundBucket(ERC20 _token, uint256 _amount) public {

    }

    // add a new bucket owner
    /// @param _owner the address to include in the owners list
    function addOwner(address _owner) public  onlyBucketOwners {

    }

    // create a new task with no funds
    /// @param _data the IPFS hash representing the JSON object storing the details of the bounty (see docs for schema details)
    /// @param _deadline the timestamp which will become the deadline of the bounty
    function createTask(
        string memory _data,
        uint256 _deadline
    ) public onlyBucketOwners {
        // standardBounties.issueBounty(_sender, _issuers, _approvers, _data, _deadline, _token, _tokenVersion);
    }

    // create a task and allocate funds
    /// @param _data the IPFS hash representing the JSON object storing the details of the bounty (see docs for schema details)
    /// @param _deadline the timestamp which will become the deadline of the bounty
    /// @param _depositAmount the amount of tokens being deposited to the bounty, which will create a new contribution to the bounty
    function createAndFundTask(
        string memory _data,
        uint256 _deadline,
        uint256 _depositAmount
    ) public onlyBucketOwners {
        // standardBounties.issueAndContribute(_sender, _issuers, _approvers, _data, _deadline, _token, _tokenVersion, _depositAmount);
    }

    /// @param _bountyId the index of the bounty
    /// @param _amount the amount of tokens being contributed
    function fundTask(
        uint _bountyId,
        uint _amount
    ) public onlyBucketOwners {
        // standardBounties.contribute(_sender, _bountyId, _amount);
    }

    /// @param _bountyId the index of the bounty
    /// @param _fulfillers the array of addresses which will receive payouts for the submission
    /// @param _data the IPFS hash corresponding to a JSON object which contains the details of the submission (see docs for schema details)
    function completeTask(
        uint _bountyId,
        address payable[] memory  _fulfillers,
        string memory _data
    ) public onlyBucketOwners {
        // standardBounties.fulfillBounty(_sender, _bountyId, _fulfillers, _data);
    }



}
