import React, { Component } from 'react';

import Navbar from './components/navbar/navbar';
import AlertBanner from './components/alertBanner/alertBanner';
import MembersTable from './components/membersTable/membersTable';
import ModalManager from './modal/modalManager';
import Button from 'react-bootstrap/Button';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: {
        type: '',
        content: '',
        display: false
      }
    }
  }

  toggleModal(type, data) {
    if(!this.refs.modalManager.state.modalIsOpen) {
      this.refs.modalManager.openModal();
      this.refs.modalManager.setContent(type, data);
    }
    else {
      this.refs.modalManager.closeModal();
    }
  }

  setAlert(type, content, duration) {
    if(!duration) {
      duration = content.length * 50;
    }

    this.setState({
      alert: {
        type: type,
        content: content,
        display: true
      }
    })

    setTimeout(() => {
      this.setState({alert: {display: false}});
    }, duration)
  }

  render() {
    return (
      <div id="app">
        <Navbar/>
        <div className="container-fluid">
          <AlertBanner type={this.state.alert.type} content={this.state.alert.content}/>
          <Button className="btn btn-primary new-member-btn" onClick={ this.toggleModal.bind(this, 'newMember') }>+ New</Button>
          <MembersTable app={this}/>
        </div>

        <ModalManager ref="modalManager" app={this}/>
      </div>
    );
  }
}

export default App;
