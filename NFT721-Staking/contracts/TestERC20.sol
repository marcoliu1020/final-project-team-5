// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is Ownable, ERC20 {   
    uint8 private _decimals;
    constructor () ERC20("Rookies", "ROKY") {
        _mint(msg.sender, 1000000); // 1M
        _decimals = 4; // 小數點第4位
    }

    function mint(address _to, uint _amount) external onlyOwner {
        _mint(_to, _amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
    
    function setDecimals(uint8 x) external onlyOwner returns (uint8) {
        return _decimals = x;
    }
}