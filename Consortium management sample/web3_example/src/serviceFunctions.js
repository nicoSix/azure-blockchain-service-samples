import web3options from './web3options';
console.log(web3options);

export async function getMembers() {
    var members = [];
    
    await web3options.Contract.methods.getMemberCount().call().then(async (res, err) => {
        if(!err) {
            for(var i = 0; i < parseInt(res); i++) {
                members.push(await getMemberInformation(i));
            }
        }
    });

    await web3options.Contract.methods.getInvitationCount().call().then(async (res, err) => {
        if(!err) {
            for(var i = 0; i < parseInt(res); i++) {
                members.push(await getInvitationInformation(i));
            }
        }
    });
    return members;
}

export async function getInvitationInformation(id) {
    return await web3options.Contract.methods.getInvitationSubscriptionIdAtIndex(id).call().then(async (res, err) => {
        if(!err) {
            return {
                id: id,
                nameId: '-',
                displayName: '-',
                subscriptionId: res,
                role: await web3options.Contract.methods.getInvitationRole(res).call().then((res, err) => { 
                    return (!err) ? capitalizeFirstLetter(res) : 'Unknown' 
                }),
                status: 'Invited',
                account: '-',
                isOwner: false,
                type: 'invitation'
            }
        }
    });
}

export async function getMemberInformation(id) {
    return await web3options.Contract.methods.getMemberNameAtIndex(id).call().then(async (res, err) => {
        if(!err) {
            return {
                id: id,
                nameId: res,
                displayName: await web3options.Contract.methods.getMemberDisplayName(res).call().then((res, err) => { 
                    return (!err) ? res : 'Unknown' 
                }),
                subscriptionId: await web3options.Contract.methods.getMemberSubscriptionId(res).call().then((res, err) => { 
                    return (!err) ? res : 'Unknown' 
                }),
                role: await web3options.Contract.methods.getMemberRole(res).call().then((res, err) => { 
                    return (!err) ? capitalizeFirstLetter(res) : 'Unknown' 
                }),
                status: await web3options.Contract.methods.getMemberStatus(res).call().then((res, err) => { 
                    return (!err) ? capitalizeFirstLetter(res) : 'Unknown' 
                }),
                account: await web3options.Contract.methods.getMemberAccount(res).call().then((res, err) => { 
                    return (!err) ? res : 'Unknown' 
                }),
                isOwner: await web3options.Contract.methods.getMemberAccount(res).call().then((res, err) => { 
                    if(!err) {
                        if(res.toLowerCase() === web3options.serviceAddress.toLowerCase()) return true;
                        else return false;
                    }
                }),
                type: 'member'
            }
        }
    });
}

export function newMember(subscriptionId, role, appReference) {
    web3options.Contract.methods.inviteMember(subscriptionId, role)
        .send({from: web3options.serviceAddress, gas: 800000})
        .catch(() => appReference.setAlert('alert-danger', 'An error occured in the smart-contract while adding a new member.'))
}

export function editInvitationRole(subscriptionId, role, appReference) {
    web3options.Contract.methods.setInvitationRole(subscriptionId, role)
        .send({from: web3options.serviceAddress, gas: 800000})
        .catch(() => appReference.setAlert('alert-danger', 'An error occured in the smart-contract while modifying invitation role.'))
}

export function deleteMember(id, type, appReference) {
    if(type === "invitation") {
        web3options.Contract.methods.removeInvitation(id)
            .send({from: web3options.serviceAddress, gas: 800000})
            .catch(() => appReference.setAlert('alert-danger', 'An error occured in the smart-contract while deleting the invitation.'));  
    }
    else if(type === "member") {
        web3options.Contract.methods.removeMember(id)
            .send({from: web3options.serviceAddress, gas: 800000})
            .catch(() => appReference.setAlert('alert-danger', 'An error occured in the smart-contract while deleting the member.'));
    }
    else return false;
}

export async function editMember(memberCurrInfo, role, displayName, account, appReference) {
    if(memberCurrInfo.role.toLowerCase() !== role)
        web3options.Contract.methods.setMemberRole(memberCurrInfo.nameId, role)
        .send({from: web3options.serviceAddress, gas: 800000})
        .catch(() => appReference.setAlert('alert-danger', 'An error occured in the smart-contract while modifying member role.'));

    if(memberCurrInfo.displayName !== displayName)
        web3options.Contract.methods.setMemberDisplayName(memberCurrInfo.nameId, displayName)
        .send({from: web3options.serviceAddress, gas: 800000})
        .catch(() => appReference.setAlert('alert-danger', 'An error occured in the smart-contract while modifying member displayed name.'));

    if(memberCurrInfo.account !== account)
        web3options.Contract.methods.setMemberAccount(memberCurrInfo.nameId, account)
        .send({from: web3options.serviceAddress, gas: 800000})
        .catch(() => appReference.setAlert('alert-danger', 'An error occured in the smart-contract while modifying member account.'));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}