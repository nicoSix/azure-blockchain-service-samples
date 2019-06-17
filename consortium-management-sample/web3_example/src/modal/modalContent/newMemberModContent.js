import React, { Component } from 'react';
import * as ServiceFunctions  from '../../serviceFunctions';

import { FaTimes } from 'react-icons/fa';

class NewMemberModContent extends Component {
    constructor(props) {
        super(props);

        this.manager = props.manager;
    }

    addMember() {
        if(this.refs.subIdField.value.length !== 36) {
            return;
        }

        if(this.refs.roleField.value === '') {
            return
        }

        ServiceFunctions.newMember(this.refs.subIdField.value, this.refs.roleField.value, this.manager.app);

        this.manager.app.setAlert('alert-success', 'Invitation successfully sent to the blockchain. The member will appear in the table when the transaction will be confirmed.');
        this.manager.closeModal();
    }
      
    render() {
        return(
            <div id="newMemberModContent">
                <div style={{display: 'block'}} >
                    <h2 style={{display: 'inline'}} ref={subtitle => this.subtitle = subtitle}>New member</h2>
                    <button style={{float: 'right'}} className="btn btn-default" onClick={this.manager.closeModal}><FaTimes/></button>
                </div>

                <hr/>

                <div className="form-group">
                    <label htmlFor="subIdField">Azure Subscription ID</label>
                    <input type="text" className="form-control" ref="subIdField" placeholder="00000000-0000-00..."/>
                </div>

                <div className="form-group">
                    <label htmlFor="roleField">Role</label>
                    <select className="form-control" ref="roleField">
                        <option value="user">User</option>
                        <option value="admin">Administrator</option>
                    </select>
                </div>

                <button className="btn btn-primary btn-block" onClick={this.addMember.bind(this)}>Submit to blockchain</button>
            </div>
        )
    }
}

export default NewMemberModContent;