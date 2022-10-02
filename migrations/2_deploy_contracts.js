const PaperGram = artifacts.require("PaperGram");

module.exports = function(deployer) {
  deployer.deploy(PaperGram);
};
