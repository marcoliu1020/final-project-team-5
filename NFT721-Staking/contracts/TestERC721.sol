// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestERC721 is ERC721("Rookie", "ROKY") {
    
    constructor() {
        _safeMint(msg.sender, 1);
        _safeMint(msg.sender, 2);
        _safeMint(msg.sender, 3);
        _safeMint(msg.sender, 4);
        _safeMint(msg.sender, 5);
    }

    function mint(address _to, uint _id) external {
        _safeMint(_to, _id);
    }

}