import React, { Component } from 'react';
import ReactModal from 'react-modal';
import * as ServiceFunctions  from '../../serviceFunctions';
import './membersTable.css';

import { FaEdit, FaTimes } from 'react-icons/fa';
 
class MembersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
        }
        this.app = props.app;
    }

    componentDidMount() {
        this.getMembers();

        setTimeout(() => {
            this.getMembersCycle(); 
        }, 5000);
    }

    getMembersCycle() {
        setTimeout(() => {
            this.getMembers();
            this.getMembersCycle(); 
        }, 5000);
    }

    getMembers() {
        ServiceFunctions.getMembers().then(res => {
            if(res) 
                this.setState({members: res})
            else {
                this.app.setAlert('alert-error', 'Error while retrieving consortium members. Please try again later.');
            }
        });
    }

    parseMemberStatus(status) {
        switch(status) {
            case 'Invited':
                return (<span className="badge badge-status badge-secondary">Invited</span>);

            case 'Ready': 
                return (<span className="badge badge-status badge-primary">Ready</span>);

            default:
                return (<span className="badge badge-status badge-default">Unknown</span>);
        }
    }

    deleteMember(type, name, subscriptionId) {
        if (window.confirm('Deleting a member is irreversible. Do you confirm ?')) {
            if(type === "member") ServiceFunctions.deleteMember(name, type, this.app);
            else if(type === "invitation") ServiceFunctions.deleteMember(subscriptionId, type, this.app);

            this.app.setAlert('alert-success', 'Deletion request successfully sent to the blockchain. The member will disappear in the table when the transaction will be confirmed.');
        }
    }

    editInvitation(subscriptionId, currentRole) {
        this.app.toggleModal('editInvitation', {subscriptionId: subscriptionId, currentRole: currentRole});
    }

    editMember(nameId, role, displayName, account) {
        this.app.toggleModal('editMember', {
            nameId: nameId,
            role: role,
            displayName: displayName,
            account: account
        });
    }

    render() {
        return(
            <div id="membersTable" className="container-fluid">
                <table className="table">
                    <thead>
                        <tr> 
                            <th>Role</th>
                            <th>Name ID</th>
                            <th>Displayed name</th>
                            <th>Subscription ID</th>
                            <th>Account</th>
                            <th>Status</th>
                            <th>Available actions</th>
                        </tr>   
                    </thead>
                    <tbody>
                        {
                            this.state.members.map(member => 
                                <tr valign="middle" key={((member.type === 'invitation') ? 'inv_' : 'mem_') + member.id}>
                                    <td>{member.role}</td>
                                    <td>{member.nameId}</td>
                                    <td>{member.displayName}</td>
                                    <td>{member.subscriptionId}</td>
                                    <td>{member.account}</td>
                                    <td>{this.parseMemberStatus(member.status)}</td>
                                    <td>
                                        <button 
                                            className="btn btn-primary space-right" 
                                            onClick={(member.type === 'invitation') 
                                                        ? this.editInvitation.bind(this, member.subscriptionId, member.role) 
                                                        : this.editMember.bind(this, member.nameId, member.role, member.displayName, member.account)
                                            }
                                        >
                                            <FaEdit/>
                                        </button>

                                        { (!member.isOwner) ? 
                                            <button 
                                                className="btn btn-danger" 
                                                onClick={this.deleteMember.bind(this, member.type, member.name, member.subscriptionId)}
                                            >
                                                <FaTimes/>
                                            </button> : ''}
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

ReactModal.setAppElement('body')

export default MembersTable;