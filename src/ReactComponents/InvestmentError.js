import React, { Component } from 'react';


class InvestmentError extends Component {
    constructor() {
        super();    
    }

    render() {
        return (<><div className="errorHeader"><h1>Application Rejected</h1></div><div className="errorWrapper"> {this.props.error}
            <ul>{this.props.errors && this.props.errors.map((error) => <li>{error}</li>)}</ul></div></>);
    }
}

export default InvestmentError;