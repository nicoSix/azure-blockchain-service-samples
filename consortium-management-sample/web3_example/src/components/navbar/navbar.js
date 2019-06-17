import React from 'react';
import logo from '../../assets/img/ms-logo.png';
import './navbar.css';

const Navbar = () => (
    <nav id="navbar" className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="https://www.microsoft.com">
            <img src={logo} className="d-inline-block align-top" alt="Microsoft logo"/>
        </a>
    </nav>
)

export default Navbar;