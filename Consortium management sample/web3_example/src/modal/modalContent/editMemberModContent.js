import React, { Component } from 'react';
import * as ServiceFunctions  from '../../serviceFunctions';

import { FaTimes } from 'react-icons/fa';

class EditMemberModContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            memberInfo: props.memberInfo
        };
        this.manager = props.manager;
    }

    componentDidMount() {
        this.refs.roleField.value = this.state.memberInfo.role.toLowerCase();
        this.refs.displayNameField.value = this.state.memberInfo.displayName;
        this.refs.accountField.value = this.state.memberInfo.account;
    }

    editMember() {
        if(this.refs.roleField.value === '') {
            return
        }

        if(this.refs.displayNameField.value === '') {
            return
        }

        if(this.refs.accountField.value === '') {
            return
        }

        ServiceFunctions.editMember(
            this.state.memberInfo,
            this.refs.roleField.value,
            this.refs.displayNameField.value,
            this.refs.accountField.value,
            this.manager.app
        );

        this.manager.app.setAlert('alert-success', 'Modifications successfully sent to the blockchain. The member will be modified in the table when the transaction will be confirmed.');
        this.manager.closeModal();
    }
      
    render() {
        return(
            <div id="newMemberModContent">
                <div style={{display: 'block'}} >
                    <h2 style={{display: 'inline'}} ref={subtitle => this.subtitle = subtitle}>Edit member</h2>
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
                
                <div className="form-group">
                    <label htmlFor="displayNameField">Display name</label>
                    <input type="text" className="form-control" ref="displayNameField" placeholder="John Doe"/>
                </div>

                <div className="form-group">
                    <label htmlFor="accountField">Account</label>
                    <input type="text" className="form-control" ref="accountField" placeholder="0x0000000..."/>
                </div>

                <button className="btn btn-primary btn-block" onClick={this.editMember.bind(this)}>Submit to blockchain</button>
            </div>
        )
    }
}

export default EditMemberModContent;