// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract TestStaking is Ownable {
    using SafeMath for uint256;

    // user list
    struct UserInfo {
        uint256 stakingAmount;
        uint256 rewardAmount;
    }
    mapping(address => UserInfo) userList;

    // NFT list
    struct NFTInfo {
        address nftAddress;
        uint256 tokenID;
        address staker;
        uint256 stakeAt; // staking time
    }
    NFTInfo[] nftStakingList;

    // interface
    IERC20 FT;
    IERC721 NFT;

    uint256 public stakeRate; // points generated per token per second staked
    address public ftAddress; // ERC20  contract address
    address public nftAddress; // ERC721 contract address

    // events
    event Stake(
        address indexed sender,
        address indexed reciever,
        uint256 tokenID,
        string message
    );

    event unStake(
        address indexed sender,
        address indexed reciever,
        uint256 tokenID,
        string message
    );

    // init
    constructor(address _ftAddress, address _nftAddress) {
        stakeRate = 1;

        ftAddress = _ftAddress;
        nftAddress = _nftAddress;
        FT = IERC20(_ftAddress);
        NFT = IERC721(_nftAddress);
    }

    function stakeNFT(
        // address _nftAddress,
        uint256 _tokenID
    ) external {
        // transfer NFT in
        NFT.transferFrom(msg.sender, address(this), _tokenID);

        // update user NFT amount
        userList[msg.sender].stakingAmount += 1;

        // add NFT into "nftStakingList" list
        nftStakingList.push(
            NFTInfo({
                nftAddress: nftAddress,
                tokenID: _tokenID,
                staker: msg.sender,
                stakeAt: block.timestamp
            })
        );

        emit Stake(
            address(msg.sender),
            address(this),
            _tokenID,
            "Stake NFT from to"
        );
    }

    function unstakeNFT(uint256 _stakeID) external {
        NFTInfo storage nft = nftStakingList[_stakeID];
        UserInfo storage user = userList[msg.sender];

        // must be staker
        require(nft.staker == msg.sender, "not owner");

        // transfer NFT out
        NFT.transferFrom(address(this), msg.sender, nft.tokenID);

        // reward user
        user.rewardAmount += _rewardPoints(block.timestamp.sub(nft.stakeAt));
        user.stakingAmount -= 1;

        // remove NFT
        if (nftStakingList.length == 1) {
            nftStakingList.pop();
        } else {
            nftStakingList[_stakeID] = nftStakingList[
                nftStakingList.length - 1
            ];
            nftStakingList.pop();
        }

        emit unStake(
            address(this),
            address(msg.sender),
            nft.tokenID,
            "unStake NFT from to"
        );
    }

    function withdrawRewards(uint256 _amount) external {
        // transfer reward to Rookies token

        require(
            _amount <= userList[msg.sender].rewardAmount,
            "not enough reward points"
        );

        // transfer to FT token
        FT.transfer(msg.sender, _amount);

        userList[msg.sender].rewardAmount -= _amount;
    }

    function setStakeRate(uint256 _rate) external onlyOwner {
        stakeRate = _rate;
    }

    function getUser(address _staker)
        public
        view
        returns (
            uint256[] memory stakingIDs,
            uint256 stakingAmount,
            uint256 rewardAmount
        )
    {
        UserInfo storage user = userList[_staker];

        uint256 _idx = 0;
        uint256[] memory _ids = new uint256[](user.stakingAmount);

        // record NFT index from "nftStakingList" list, then input "stakingIDs" array
        for (uint256 i = 0; i < nftStakingList.length; i++) {
            if (_staker == nftStakingList[i].staker) {
                _ids[_idx++] = i;
            }
        }

        stakingIDs = _ids;
        stakingAmount = user.stakingAmount;
        rewardAmount = user.rewardAmount;
    }

    function getSakingNft(uint256 _stakingID)
        external
        view
        returns (
            address nftAddress_,
            uint256 tokenID,
            address staker,
            uint256 stakeAt
        )
    {
        NFTInfo storage nft = nftStakingList[_stakingID];

        nftAddress_ = nft.nftAddress;
        tokenID = nft.tokenID;
        staker = nft.staker;
        stakeAt = nft.stakeAt;
    }

    function getStakingReward(address userAddress)
        public
        view
        returns (uint256)
    {
        // get current reward points, not include "user.rewardAmount"

        // get user informaiton
        (uint256[] memory nftStakeIds, uint256 stakingAmount, ) = getUser(
            userAddress
        );

        // all NFT staking time
        uint256 timeElapsed = 0;

        // get all NFT from "nftStakingList" list, then accumulate "timeElapsed"
        for (uint256 i = 0; i < stakingAmount; i++) {
            uint256 _id = nftStakeIds[i];
            timeElapsed += block.timestamp.sub(nftStakingList[_id].stakeAt);
        }

        return _rewardPoints(timeElapsed);
    }

    function getStakingNftCount() public view returns (uint256) {
        return nftStakingList.length;
    }

    function _rewardPoints(uint256 _timeElapsed)
        private
        view
        returns (uint256)
    {
        return _timeElapsed.mul(stakeRate);
    }
}
