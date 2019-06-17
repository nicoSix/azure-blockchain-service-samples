import React, { Component } from 'react';
import Modal from 'react-modal';

import NewMemberModContent from './modalContent/newMemberModContent';
import EditInvitationModContent from './modalContent/editInvitationModContent';
import EditMemberModContent from './modalContent/editMemberModContent';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

class ModalManager extends Component {
    constructor(props) {
        super(props);

        this.app = props.app;
        this.state = {
            modalIsOpen: false,
            modalContent: {
                title: '',
                content: (<div/>)
            }
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    setContent(type, data) {
        switch(type) {
            case 'newMember':
                this.setState({
                    modalContent: {
                        title: 'New member',
                        content: (<NewMemberModContent manager={this}/>)
                    }
                })
                break;

            case 'editInvitation':
                this.setState({
                    modalContent: {
                        title: 'Edit invitation',
                        content: (<EditInvitationModContent manager={this} subscriptionId={data.subscriptionId} currentRole={data.currentRole}/>)
                    }
                })
                break;

            case 'editMember':
                this.setState({
                    modalContent: {
                        title: 'Edit member',
                        content: (<EditMemberModContent manager={this} memberInfo={data}/>)
                    }
                })
                break;
                

            default:
                return;
        }
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }
      
    render() {
        return(
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel={this.state.modalContent.title}
            >
    
                {this.state.modalContent.content}
                
            </Modal>
        )
    }
}

export default ModalManager;