var web3 = new Web3(Web3.givenProvider);
var instance;
var marketplaceInstance;
var user;
//change contract address each time redeployed
var contractAddress = "0x640cfF5f6146Ac1e3843755876329F682f88ea33";
var marketplaceAddress = "0x94dA55066323Caf11a0E6Df7fF9372196FFf67C4";

$(document).ready(function(){
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi.kittyContract, contractAddress, {from: accounts[0]});
        marketplaceInstance = new web3.eth.Contract(abi.marketplace, marketplaceAddress, {from: accounts[0]});
        user = accounts[0];
        console.log(instance);
        
        instance.events.Birth().on('data', function(event){
            console.log(event);
            let _owner = event.returnValues._owner;
            let kittenId = event.returnValues.kittenId;
            let mumId = event.returnValues.mumId;
            let dadId = event.returnValues.dadId;
            let genes = event.returnValues.genes;
            $('#kittyCreate').css("display", "block");
            $('#kittyCreate').text("owner: " + _owner +
                                    " kittyId: " + kittenId +
                                    " mumID: " + mumId +
                                    " dadID: " + dadId +
                                    " genes: " + genes);

        })
        .on("error", console.error);

        marketplaceInstance.events.MarketTransaction()
        .on('data', (event) => {
          console.log(event);
          var eventType = event.returnValues["TxType"].toString()
          var tokenId = event.returnValues["tokenId"]
          if (eventType == "Buy") {
            alert_msg('Succesfully Kitty purchase! Now you own this Kitty with TokenId: ' + tokenId, 'success')
          }
          if (eventType == "Create offer") {
            alert_msg('Successfully Offer set for Kitty id: ' + tokenId, 'success')
            $('#cancelBox').removeClass('hidden')
            $('#cancelBtn').attr('onclick', 'deleteOffer(' + tokenId + ')')
            $('#sellBtn').attr('onclick', '')
            $('#sellBtn').addClass('btn-warning')
            $('#sellBtn').html('<b>For sale at:</b>')
            var price = $('#catPrice').val()
            $('#catPrice').val(price)
            $('#catPrice').prop('readonly', true)

        }
        if (eventType == "Remove offer") {
          alert_msg('Successfully Offer remove for Kitty id: ' + tokenId, 'success')
          $('#cancelBox').addClass('hidden')
          $('#cancelBtn').attr('onclick', '')          
          $('#catPrice').val('')
          $('#catPrice').prop('readonly', false)
          $('#sellBtn').removeClass('btn-warning')
          $('#sellBtn').addClass('btn-success')
          $('#sellBtn').html('<b>Sell me</b>')
          $('#sellBtn').attr('onclick', 'sellCat(' + tokenId + ')')          
        }
      })
      .on('error', console.error);
    })
})

//Get kitties for breeding that are not selected
async function breedKitties(gender) {
    var arrayId = await instance.methods.getKittyByOwner(user).call();
    for (i = 0; i < arrayId.length; i++) {
      appendBreed(arrayId[i],gender)
    }
}
  
//Appending cats to breed selection
async function appendBreed(id,gender) {
    var kitty = await instance.methods.getKitty(id).call()  
    breedAppend(kitty[0], id, kitty.generation,gender)
}
  
//Appending cats to breed selection
async function breed(dadId,mumId) {
    try {
        var newKitty = await instance.methods.breed(dadId,mumId).send()  
        console.log(newKitty)
        setTimeout(()=>{
            go_to('catalogue.html')
        },2000)
    } catch (err){
        console.log(err)
    }  
}

//Appending cats for catalog
async function appendKitty(id) {
    var kitty = await instance.methods.getKitty(id).call()  
    appendCat(kitty[0], id, kitty['generation'])
}
  
  
async function singleKitty() {
    var id = get_variables().catId
    var kitty = await instance.methods.getKitty(id).call()
    singleCat(kitty[0], id, kitty['generation'])
}

async function catOwnership(id) {

    var address = await instance.methods.ownerOf(id).call()
  
    if (address.toLowerCase() == user.toLowerCase()) {      
      return true
    }  
    return false
  
}

async function sellCat(id) {  
    var price = $('#catPrice').val()
    var amount = web3.utils.toWei(price, "ether")
    try {
      await marketplaceInstance.methods.setOffer(amount,id).send();
    } catch (err) {
      console.log(err);
    }
}
async function buyKitten(id, price) {
    var amount = web3.utils.toWei(price, "ether")
    try {
      await marketplaceInstance.methods.buyKitty(id).send({ value: amount });
    } catch (err) {
      console.log(err);
    }
  }

async function checkOffer(id) {

    let res;
    try {
  
      res = await marketplaceInstance.methods.getOffer(id).call();
      var price = res['price'];
      var seller = res['seller'];
      var onsale = false
      //If price more than 0 means that cat is for sale
      if (price > 0) {
        onsale = true
      }
      //Also might check that belong to someone
      price = Web3.utils.fromWei(price, 'ether');
      var offer = { seller: seller, price: price, onsale: onsale }
      return offer
  
    } catch (err) {
      console.log(err);
      return
    }
}    
  
  

function createKitty(){
    var dnaStr = getDna();
    instance.methods.createKittyGen0(dnaStr).send({}, function(error, txHash){
        if(error){
            console.log(err)
        } else {
            console.log(txHash)
        }
    })
}

async function getKitties(){  

    var arrayId = await instance.methods.getKittyByOwner(user).call();
    var kitty;
    
    for (i = 0; i < arrayId.length; i++){
      kitty = await instance.methods.getKitty(arrayId[i]).call();
      appendCat(kitty[0],arrayId[i], kitty.generation)
    }
    console.log(kitty);
    
}

function go_to(url) {
    window.location.href = url;
}
function empty(str) {
    return (!str || 0 === str.length);
}

function get_variables() {
    var $_GET = [];
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (a, name, value) {
      $_GET[name] = value;                
    });
    return $_GET;
  }
function alert_msg(content, type) {
    var str = '';
    str += '<div class="alert alert-' + type + ' fit-content mt-3" role="alert">' + content + '<button type="button" class="close ml-2" data-dismiss="alert" aria-label="Close"> <i class="far fa-times-circle"></i> </button></div>';    
    $('#message').html(str)    
}

