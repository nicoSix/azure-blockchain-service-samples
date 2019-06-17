var prompt = require('prompt');

var Members = artifacts.require("Members");
var contract_address = "0xfb091e4feceec1869daba758de9e9ef00c2e4d7a";

module.exports = function() {
  try {
    prompt.get(['subscriptionId', 'role'], async function (err, result) {
      console.log('User informations:');
      console.log('  subscriptionId: ' + result.subscriptionId);
      console.log('  role: ' + result.role);
  
      console.log('Sending invitation ...');
  
      let ins = await Members.at(contract_address);
      let res = await ins.inviteMember(result.subscriptionId, result.role);
  
      console.log('Result : ');
      console.log(res);
    });
  }
  catch(e) {
    console.log('Error : ' + e);
  }
};