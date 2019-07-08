import Members from './assets/contracts/Members';

var Web3 = require("web3");

var defaultNodeAddress = "<your Azure Service main node address with access key>";
var contractAddress = "<Members contract address>"
var serviceAddress = "<your Member account>";
var servicePassword = "<your password>";

function getABSProvider() {
    const AzureBlockchainProvider = new Web3.providers.HttpProvider(defaultNodeAddress);
    const web3 = new Web3(AzureBlockchainProvider, null, {transactionConfirmationBlocks: 1});
    web3.eth.personal.unlockAccount(serviceAddress, servicePassword, 2000000000);

    return web3;
}

export default {
    serviceAddress: serviceAddress,
    contractAddress: contractAddress,
    contractABI: Members.abi,
    Contract: new getABSProvider().eth.Contract(Members.abi, contractAddress)
}