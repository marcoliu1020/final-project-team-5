// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Rookies is ERC721, ERC721Enumerable, Ownable {
    
  using SafeMath for uint256;
  using Strings for uint256;

  bool private _isPreSaleActive = false;
  bool private _isPublicSaleActive = false;
  
  uint256 public offsetIndex = 0;
  uint256 public revealTimeStamp = block.timestamp + 86400; 
  uint256 public constant PRICE = .01 ether;
  uint256 public constant MAX_SUPPLY = 10000;

  string private _baseURIExtended;
  string private _preRevealURI;

  address private s1 = 0x00380A88f081020Ae09ab8d19b0c554dB499b66D ;
  address private s2 = 0x00380A88f081020Ae09ab8d19b0c554dB499b66D ;
  address private s3 = 0x00380A88f081020Ae09ab8d19b0c554dB499b66D ;
  address private s4 = 0x00380A88f081020Ae09ab8d19b0c554dB499b66D ;
  address private s5 = 0x00380A88f081020Ae09ab8d19b0c554dB499b66D ;
  address private s6 = 0x00380A88f081020Ae09ab8d19b0c554dB499b66D ;

  mapping(address => bool) private _allowList; 
  mapping(address => bool) private _blackList;
  
  modifier onlyShareHolders() {
        require(msg.sender == s1 || msg.sender == s2 || msg.sender == s3 || msg.sender == s4 || msg.sender == s5 || msg.sender == s6);
        _;
    }

  modifier onlyRealUser() {
    require(msg.sender == tx.origin, "Oops. Something went wrong !");
    _;
  }
  
  event PreSale_Started();
  event PreSale_Stopped();
  event PublicSale_Started();
  event PublicSale_Stopped();
  event TokenMinted(uint256 supply);

  constructor() ERC721('Rookies', 'ROKY') {}

  function addToAllowList(address[] calldata addresses) external onlyOwner {
    for (uint256 i = 0; i < addresses.length; i++) {
      require(addresses[i] != address(0), "Can't add the null address");
      _allowList[addresses[i]] = true;
    }
  }

  function removeFromAllowList(address[] calldata addresses) external onlyOwner {
    for (uint256 i = 0; i < addresses.length; i++) {
      require(addresses[i] != address(0), "Can't add the null address");
      _allowList[addresses[i]] = false;
    }
  }
  
  function onAllowList(address addr) external view returns (bool) {
    return _allowList[addr];
  }
  
  function startPreSale() public onlyOwner {
    _isPreSaleActive = true;
    emit PreSale_Started();
  }

  function pausePreSale() public onlyOwner {
    _isPreSaleActive = false;
    emit PreSale_Stopped();
  }

  function isPreSaleActive() public view returns (bool) {
    return _isPreSaleActive;
  }

  function startPublicSale() public onlyOwner {
    _isPublicSaleActive = true;
    emit PublicSale_Started();
  }

  function pausePublicSale() public onlyOwner {
    _isPublicSaleActive = false;
    emit PublicSale_Stopped();
  }

  function isPublicSaleActive() public view returns (bool) {
    return _isPublicSaleActive;
  }
  

  function withdraw() public onlyShareHolders {
    uint256 _each = address(this).balance / 4;
    require(payable(s1).send(_each), "Send Failed");
    require(payable(s2).send(_each), "Send Failed");
    require(payable(s3).send(_each), "Send Failed");
    require(payable(s4).send(_each), "Send Failed");
    require(payable(s5).send(_each), "Send Failed");
    require(payable(s6).send(_each), "Send Failed");  
    }
  
  function getTotalSupply() public view returns (uint256) {
    return totalSupply();
  }

  function getTokenByOwner(address _owner) public view returns (uint256[] memory) {
    uint256 tokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](tokenCount);
    for (uint256 i; i < tokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function mint_presale(uint8 NUM_TOKENS_MINT) public payable onlyRealUser {
    require(_isPreSaleActive, "Sales is not active");
    require(totalSupply().add(NUM_TOKENS_MINT) <= 9612, "Exceeding max supply");
    require(_allowList[msg.sender], "You are not in the allowList");
    require(NUM_TOKENS_MINT <= 2, "You can not mint over 2 at a time");
    require(NUM_TOKENS_MINT > 0, "At least one should be minted");
    require(PRICE*NUM_TOKENS_MINT <= msg.value, "Not enough ether sent");
    _allowList[msg.sender] = false ;
    _mint(NUM_TOKENS_MINT, msg.sender);
    emit TokenMinted(totalSupply());
  }
  
  function mint_public(uint8 NUM_TOKENS_MINT) public payable onlyRealUser {
    require(_isPublicSaleActive, "Sales is not active");
    require(totalSupply().add(NUM_TOKENS_MINT) <= 9612, "Exceeding max supply");
    require(NUM_TOKENS_MINT <= 10, "You can not mint over 10 at a time");
    require(NUM_TOKENS_MINT > 0, "At least one should be minted");
    require(PRICE*NUM_TOKENS_MINT <= msg.value, "Not enough ether sent");
    _mint(NUM_TOKENS_MINT, msg.sender);
    emit TokenMinted(totalSupply());
  }
  
  function reserve(uint256 num) public onlyOwner {
    require(totalSupply().add(num) <= MAX_SUPPLY, "Exceeding max supply");
    _mint(num, msg.sender);
    emit TokenMinted(totalSupply());
  }

  function airdrop(uint256 num, address recipient) public onlyOwner {
    require(totalSupply().add(num) <= MAX_SUPPLY, "Exceeding max supply");
    _mint(num, recipient);
    emit TokenMinted(totalSupply());
  }
  
  function airdropToMany(address[] memory recipients) external onlyOwner {
    require(totalSupply().add(recipients.length) <= MAX_SUPPLY, "Exceeding max supply");
    for (uint256 i = 0; i < recipients.length; i++) {
      airdrop(1, recipients[i]);
    }
  }

  function _mint(uint256 num, address recipient) internal {
    uint256 supply = totalSupply();
    for (uint256 i = 0; i < num; i++) {
      _safeMint(recipient, supply + i);
    }
  }

  function setRevealTimestamp(uint256 newRevealTimeStamp) external onlyOwner {
    revealTimeStamp = newRevealTimeStamp;
  }

  function setBaseURI(string memory baseURI_) external onlyOwner {
    _baseURIExtended = baseURI_;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseURIExtended;
  }

  function setPreRevealURI(string memory preRevealURI) external onlyOwner {
    _preRevealURI = preRevealURI;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory uri) {
    require(_exists(tokenId), 'ERC721Metadata: URI query for nonexistent token');
    if (totalSupply() >= MAX_SUPPLY || block.timestamp >= revealTimeStamp) {
      if (tokenId < MAX_SUPPLY) {
        uint256 offsetId = tokenId.add(MAX_SUPPLY.sub(offsetIndex)).mod(MAX_SUPPLY);
        return string(abi.encodePacked(_baseURI(), offsetId.toString(), ".json"));
      } } 
      else {
      return _preRevealURI;
    }
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}