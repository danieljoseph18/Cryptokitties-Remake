const Kitty = artifacts.require("Kitty");

module.exports = function (deployer) {
  deployer.deploy(Kitty);
};