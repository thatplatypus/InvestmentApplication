import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';



class BusySpinner extends Component {

    constructor() {
        super();
        this.state = {
            visible: true
        };

    }

    render() {
        return (
            <>
                <Spinner animation="border" variant="Secondary" className="Spinner" />
                <div className="Spinner">Validating investment application please wait...</div>
            </>
        );
    }
}

export default BusySpinner;