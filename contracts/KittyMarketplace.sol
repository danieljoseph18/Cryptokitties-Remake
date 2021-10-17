// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./KittyContract.sol";
import './IKittyMarketplace.sol';

contract KittyMarket is IKittyMarketPlace {
    //need to initialize address in setKittyContract
    Kitty private _kittyContract;

    struct Offer {
        address payable seller;
        uint256 price;
        uint256 index;
        uint256 tokenId;
        bool active;
    }

    Offer[] offers; 
    address private owner;

    mapping(uint256 => Offer) tokenIdToOffer;

    constructor(address _kittyContractAddress){
        owner = msg.sender;
        setKittyContract(_kittyContractAddress);
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    function setKittyContract(address _kittyContractAddress) public onlyOwner {
        _kittyContract = Kitty(_kittyContractAddress);
    }

    function getOffer(uint256 _tokenId) external view returns ( address seller, uint256 price, uint256 index, uint256 tokenId, bool active){
        seller = tokenIdToOffer[_tokenId].seller;
        price = tokenIdToOffer[_tokenId].price;
        index = tokenIdToOffer[_tokenId].index;
        tokenId = _tokenId;
        active = tokenIdToOffer[_tokenId].active;

        return (seller, price, index, tokenId, active); 
    }

    function getAllTokenOnSale() external view  returns(uint256[] memory listOfOffers){
        uint256 numberOfOffers = offers.length;
        if(numberOfOffers == 0){
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](numberOfOffers);
            uint256 offerId;
            for(offerId = 0; offerId < numberOfOffers; offerId++){
                if(offers[offerId].active == true){
                    result[offerId] = offers[offerId].tokenId;
                }
            }
            return result;
        }
    }

    function setOffer(uint256 _price, uint256 _tokenId) external {
        require(_kittyContract.isOwner(msg.sender, _tokenId) == true);
        require(tokenIdToOffer[_tokenId].active == false);
        require(_kittyContract.isApprovedForAll(msg.sender, address(this)) == true);
        Offer memory newOffer = Offer({seller: payable(msg.sender), price: _price, index: offers.length, tokenId: _tokenId, active: true});
        offers.push(newOffer);
        emit MarketTransaction("Create offer", msg.sender, _tokenId);
    }

    function removeOffer(uint256 _tokenId) external{
        require(tokenIdToOffer[_tokenId].seller == msg.sender);
        uint256 tokenIndex = tokenIdToOffer[_tokenId].index;
        delete tokenIdToOffer[_tokenId];
        offers[tokenIndex].active = false;
        emit MarketTransaction("Remove offer", msg.sender, _tokenId);
    }

    function buyKitty(uint256 _tokenId) external payable{
        Offer memory _offer = tokenIdToOffer[_tokenId];
        require(_offer.active == true);
        require(msg.value == _offer.price);
        delete tokenIdToOffer[_tokenId];
        offers[_offer.index].active = false;

        if(_offer.price > 0){
            _offer.seller.transfer(msg.value);
        }
        _kittyContract.transferFrom(_offer.seller, msg.sender, _tokenId);
        emit MarketTransaction("Buy", msg.sender, _tokenId);
    }
}
