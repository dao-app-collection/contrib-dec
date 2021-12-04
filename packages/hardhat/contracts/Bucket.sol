pragma solidity >=0.5.12;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/ownership/Ownable.sol';
import "./standard-bounties/StandardBounties.sol";

contract Bucket is Ownable {

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

    constructor(
        address[] memory _owners,
        ERC20 _token,
        Bucket _parent,
        StandardBounties _standardBounties
    ) public {
        require(_owners.length > 0, "Bucket requires at least one owner");
        owners = _owners;
        parent = _parent;
        token = _token;
        standardBounties = _standardBounties;
    }

    // increase the balance of this bucket
    /// @param _amount the amount of tokens to send to the bucket
    function fundBucket(uint256 _amount) public {
        require(token.transferFrom(msg.sender, address(this), _amount));
        balance += _amount;
    }

    // add a new bucket owner
    /// @param _owner the address to include in the owners list
    function addOwner(address _owner) public  onlyBucketOwners {

    }

    // create a new task with no funds
    /// @param _data the IPFS hash representing the JSON object storing the details of the bounty (see docs for schema details)
    /// @param _deadline the timestamp which will become the deadline of the bounty
    /// @param _issuers the array of addresses who will be the issuers of the bounty
    /// @param _approvers the array of addresses who will be the approvers of the bounty
    function createTask(
        string memory _data,
        uint256 _deadline,
        address payable[] memory _issuers,
        address[] memory _approvers
    ) public onlyBucketOwners {
        address payable sender = address(uint160(address(this)));

        standardBounties.issueBounty(
            sender,
            _issuers,
            _approvers,
            _data,
            _deadline,
            address(token),
            20
        );
    }

    // create a task and allocate funds
    /// @param _data the IPFS hash representing the JSON object storing the details of the bounty (see docs for schema details)
    /// @param _deadline the timestamp which will become the deadline of the bounty
    /// @param _issuers the array of addresses who will be the issuers of the bounty
    /// @param _approvers the array of addresses who will be the approvers of the bounty
    /// @param _depositAmount the amount of tokens being deposited to the bounty, which will create a new contribution to the bounty
    function createAndFundTask(
        string memory _data,
        uint256 _deadline,
        address payable[] memory _issuers,
        address[] memory _approvers,
        uint256 _depositAmount
    ) public onlyBucketOwners {
        address payable sender = address(uint160(address(this)));

        require(token.approve(address(standardBounties), _depositAmount));

        standardBounties.issueAndContribute(
            sender,
            _issuers,
            _approvers,
            _data,
            _deadline,
            address(token),
            20,
            _depositAmount
        );
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
