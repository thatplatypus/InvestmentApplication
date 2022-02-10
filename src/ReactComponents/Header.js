import React, { Component } from 'react';
import logo from '../Icons/logo.svg';
import '../App.css';

class Header extends Component {

    constructor() {
        super();
        };
    

    render() {
        return (
            <header className="App-header" >
                <img className = "App-header-logo" src={logo} alt="Logo" height="75vh" width="107vh" />
                <div className = "App-header-text">Investment Application</div>
            </header >
        );
    }
}

export default Header;

    