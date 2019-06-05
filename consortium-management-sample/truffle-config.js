var Web3 = require("web3");

var defaultNodeAddress = "<Your node URL>";
var myAccount = "<Your Ethereum account public address>";
var myPassword = "<Your Ethereum account password>";

module.exports = {
  networks: {
    development: {
      provider:(() =>  {
      const AzureBlockchainProvider = new Web3.providers.HttpProvider(defaultNodeAddress);

      const web3 = new Web3(AzureBlockchainProvider);
      web3.eth.personal.unlockAccount(myAccount, myPassword);

      return AzureBlockchainProvider;
      })(),

      network_id: "*",
      gas: 0,
      gasPrice: 0,
      from: myAccount,
      consortium_id: 1557912439843,
      type: "quorum"
    }
  }
}