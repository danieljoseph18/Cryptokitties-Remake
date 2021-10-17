const Kitty = artifacts.require("Kitty");
const Marketplace = artifacts.require("KittyMarket");

module.exports = function (deployer) {
  deployer.deploy(Marketplace, Kitty.address);
};