import React, { Component } from 'react';
import * as ServiceFunctions  from '../../serviceFunctions';

import { FaTimes } from 'react-icons/fa';

class EditInvitationModContent extends Component {
    constructor(props) {
        super(props);

        this.currentRole = props.currentRole;
        this.subscriptionId = props.subscriptionId;
        this.manager = props.manager;
    }

    componentDidMount() {
        this.refs.roleField.value = this.currentRole.toLowerCase();
    }

    editInvitation() {
        if(this.refs.roleField.value === '') {
            return
        }

        ServiceFunctions.editInvitationRole(this.subscriptionId, this.refs.roleField.value, this.manager.app);

        this.manager.app.setAlert('alert-success', 'Modifications successfully sent to the blockchain. The member will be modified in the table when the transaction will be confirmed.');
        this.manager.closeModal();
    }
      
    render() {
        return(
            <div id="newMemberModContent">
                <div style={{display: 'block'}} >
                    <h2 style={{display: 'inline'}} ref={subtitle => this.subtitle = subtitle}>Edit invitation</h2>
                    <button style={{float: 'right'}} className="btn btn-default" onClick={this.manager.closeModal}><FaTimes/></button>
                </div>

                <hr/>

                <div className="form-group">
                    <label htmlFor="roleField">Role</label>
                    <select className="form-control" ref="roleField">
                        <option value="user">User</option>
                        <option value="admin">Administrator</option>
                    </select>
                </div>

                <button className="btn btn-primary btn-block" onClick={this.editInvitation.bind(this)}>Submit to blockchain</button>
            </div>
        )
    }
}

export default EditInvitationModContent;