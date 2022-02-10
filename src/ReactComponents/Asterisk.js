import React, { Component } from 'react';

//Just to style required fields a little differently
class Asterisk extends Component {
    render() {
        return <span className="asterisk-required" >*</span >;
    }
}

export default Asterisk;