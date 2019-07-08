var Members = artifacts.require("Members");
var contract_address = "<Members contract address>";

module.exports = async function() {
    try {
        console.log('Retrieving informations ...');

        let ins = await Members.at(contract_address);
        let invCount = await ins.getInvitationCount();
        let memCount = await ins.getMemberCount();
    
        console.log('Number of members : ' + memCount + ', number of open invitations : ' + invCount + '\n');
        console.log('Members : ');
    
        for(var i = 0; i < memCount; i++) {
            var name = await ins.getMemberNameAtIndex(i);
            var role = await ins.getMemberRole(name);
            var subId = await ins.getMemberSubscriptionId(name);
            console.log(' - Member n°' + i + ' : ' + name + ' (' + subId + '), ' + role);
        }
    
        console.log('\nInvitations : ');
    
        for(var i = 0; i < invCount; i++) {
            var subId = await ins.getInvitationSubscriptionIdAtIndex(i);
            var role = await ins.getInvitationRole(subId);
            console.log(' - Invitation n°' + i + ' : unknown (' + subId + '), ' + role);
        }
    }
    catch(e) {
        console.log('Error : ' + e);
    }
};