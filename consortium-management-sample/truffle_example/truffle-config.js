var Web3 = require("web3");

var defaultNodeAddress = "<your Azure Service main node address with access key>";
var myAccount = "<your Member account>";
var myPassword = "<your password>";

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