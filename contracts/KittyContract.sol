// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "./IERC721.sol";
import "./IERC721Receiver.sol";

contract Kitty is IERC721 {

    mapping(address => uint256) tokenAmount;
    mapping(uint256 => address) tokenToOwner;

    function isOwner(address _owner, uint256 _tokenId) public view returns(bool) {
        if(tokenToOwner[_tokenId] == _owner){
            return true;
        } else {
            return false;
        }
    }

    uint public gen0Limit = 20;
    uint public gen0Amount = 0;

    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

    string public constant _name = "DanKitties";
    string public constant _symbol = "DKTS";
    address private owner;
    bytes4 internal constant ERC721_Received = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

    mapping(uint => address) public kittyIndexToApproved;
    //first address owner second address approved 
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    constructor(){
        owner = msg.sender;
        //creates a kitty so no other kitty can occupy index 0 and cause problems 
        _createKitty(0,0,0, uint256(0), address(0));
    }

    event Birth(address _owner, uint kittenId, uint mumId, uint dadId, uint genes);

    struct Token {
        uint256 genes;
        uint64 birthTime;
        uint32 mumID;
        uint32 dadID;
        uint16 generation;
    }

    Token[] public kitties;

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    function supportsInterface(bytes4 _interfaceId) external pure returns(bool){
        return (_interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165);
    }

    function approve(address _approved, uint256 _tokenId) external override {
        require(tokenToOwner[_tokenId] == msg.sender || _operatorApprovals[tokenToOwner[_tokenId]][msg.sender] == true);
        require(_approved != msg.sender);
        require(_approved != address(0));

        _approve(msg.sender, _approved, _tokenId);
    }

    function _approve(address _owner, address _approved, uint256 _tokenId) internal {
        kittyIndexToApproved[_tokenId] = _approved;
        emit Approval(_owner, _approved, _tokenId);
    } 

    function setApprovalForAll(address _operator, bool _approved) external override {
        require(_operator != address(0));
        require(_operator != msg.sender);
        require(_approved != _operatorApprovals[msg.sender][_operator], "Cannot overwrite an Approval");

        _setApprovalForAll(msg.sender, _operator, _approved);
    }

    function _setApprovalForAll(address _owner ,address _operator, bool _approved) internal {
        _operatorApprovals[_owner][_operator] = _approved;
        emit ApprovalForAll(_owner, _operator, _approved);
    }

    function getApproved(uint256 _tokenId) external view override returns (address){
        require(_tokenId < kitties.length);
        return kittyIndexToApproved[_tokenId];
    }

    function isApprovedForAll(address _owner, address _operator) external view override returns (bool){
        return _operatorApprovals[_owner][_operator];
    }

    function balanceOf(address _owner) external view override returns (uint256 balance){
        return tokenAmount[_owner];
    }

     function totalSupply() external view override returns (uint256 total){
         return kitties.length;
    }

    function name() external pure override returns (string memory tokenName){
        return _name;
    }

    function symbol() external pure override returns (string memory tokenSymbol){
        return _symbol;
    }

    function ownerOf(uint256 tokenId) external view override returns (address _owner){
        return tokenToOwner[tokenId];
    }

    function transfer(address to, uint256 tokenId) external override {
        require(to != address(0));
        require(to != address(this));
        require(tokenToOwner[tokenId] == msg.sender);

        _transfer(msg.sender, to, tokenId);
    }

    function _transfer(address _from, address _to, uint256 tokenId) internal {
        tokenAmount[_to]+= 1;
        
        if(_from != address(0)){
            tokenAmount[_to] -=1;
            delete kittyIndexToApproved[tokenId];
        }
        tokenToOwner[tokenId] = _to;
        emit Transfer(_from, _to, tokenId);
    }

    function breed(uint256 _dadId, uint256 _mumId) public returns(uint256){
        require(tokenToOwner[_dadId] == msg.sender && tokenToOwner[_mumId] == msg.sender);
        uint256 _dadDNA = kitties[_dadId].genes;
        uint256 _mumDNA = kitties[_mumId].genes;
        
        uint256 _newDNA = _mixDNA(_dadDNA, _mumDNA);
        uint16 newGen = newGeneration(_dadId, _mumId);
        tokenAmount[msg.sender]++;
        return _createKitty(_mumId, _dadId, newGen, _newDNA, msg.sender);
    }    

    function newGeneration(uint256 _dadId, uint256 _mumId) internal view returns(uint16) {
        uint16 _dadGen = kitties[_dadId].generation;
        uint16 _mumGen = kitties[_mumId].generation;
        uint16 _childGen;

        if(_dadGen == _mumGen){
            _childGen = _dadGen + 1;
        } else if (_dadGen > _mumGen){
            _childGen = (_dadGen + 1) - (_mumGen + 1);
        } else {
            _childGen = (_mumGen + 1) - (_dadGen + 1);
        }
        return _childGen;
    }

    function _mixDNA(uint256 _dadDNA,uint256 _mumDNA) internal view returns (uint256) {
        uint256[8] memory geneArray;
        uint8 random = uint8(block.timestamp % 256);
        uint index = 7;
        uint i = 1;
        for(i=1; i <= 128; i= i*2){
            if(random & i != 0){
                geneArray[index] = uint8(_mumDNA % 100);
            } else {
                geneArray[index] = uint8(_dadDNA % 100);
            }
            _mumDNA = _mumDNA / 100;
            _dadDNA = _dadDNA / 100;
            index = index -1;
        }
        uint256 newGene;
        for(i=0; i<8; i++){
            newGene = newGene + geneArray[i];
            if(i != 7){
                newGene = newGene * 100;
            }
        }
        return newGene;

    } 

    function _createKitty(uint256 _mumID, uint256 _dadID, uint256 _generation,
    uint256 _genes, address _owner) internal returns(uint256){
        Token memory _kitty = Token ({genes: _genes, birthTime: uint64(block.timestamp),
        mumID: uint32(_mumID), dadID: uint32(_dadID), generation: uint16(_generation)});
        kitties.push(_kitty);
        uint256 newKittyId = kitties.length -1; 
        emit Birth(_owner, newKittyId, _mumID, _dadID, _genes);
        _transfer(address(0), _owner, newKittyId);
        return newKittyId;
    }

    function createKittyGen0(uint _genes) public onlyOwner returns(uint256){
        require(gen0Amount < gen0Limit);
        gen0Amount++;
        tokenAmount[msg.sender]++;
        return _createKitty(0,0,0, _genes, owner);
    }

    function getKitty(uint256 _id) public view returns (
        uint256 genes,
        uint256 birthTime,
        uint256 mumID,
        uint256 dadID,
        uint256 generation
    ) 
    {
        Token storage kitty = kitties[_id];

        birthTime = uint256(kitty.birthTime);
        mumID = uint256(kitty.mumID);
        dadID = uint256(kitty.dadID);
        generation = uint256(kitty.generation);
        genes = kitty.genes;
    }

    function getKittyByOwner(address _owner) external view returns(uint[] memory) {
        uint[] memory result = new uint[](tokenAmount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < kitties.length; i++) {
            if (tokenToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata data) external override {
        if(_from == msg.sender){
            require(tokenToOwner[_tokenId] == msg.sender);
        } else {
            require(kittyIndexToApproved[_tokenId] == msg.sender || _operatorApprovals[_from][_to] == true);
            require(tokenToOwner[_tokenId] == _from);
        }
        require(_to != address(0));
        require(_tokenId < kitties.length);

        _safeTransfer(_from, _to, _tokenId, data);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external override {
        if(_from == msg.sender){
            require(tokenToOwner[_tokenId] == msg.sender);
        } else {
            require(kittyIndexToApproved[_tokenId] == msg.sender || _operatorApprovals[_from][_to] == true);
            require(tokenToOwner[_tokenId] == _from);
        }
        require(_to != address(0));
        require(_tokenId < kitties.length);

        _safeTransfer(_from, _to, _tokenId, "");
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public override {
        if(_from == msg.sender){
            require(tokenToOwner[_tokenId] == msg.sender);
        } else {
            require(kittyIndexToApproved[_tokenId] == msg.sender || _operatorApprovals[_from][_to] == true);
            require(tokenToOwner[_tokenId] == _from);
        }
        require(_to != address(0));
        require(_tokenId < kitties.length);

        _transfer(_from, _to, _tokenId);
    }

    function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal {
        _transfer(_from, _to, _tokenId);
        require(_checkERC721Support(_from, _to, _tokenId, _data));
    }

    function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) internal returns (bool){
        if(! _isContract(_to)){
            return true;
        }

        bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
        return returnData == ERC721_Received;
    }

    function _isContract(address _to) internal view returns(bool){
        uint32 size;
        assembly {
            size:= extcodesize(_to)
        }
        return size>0; 
    }



}