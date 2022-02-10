import React, { Component } from 'react';
import Asterisk from './Asterisk';
import '../App.css';

//Wrapper for inputs to style as a whole component
class InputField extends Component {

    constructor(props) {
        super(props);
    }
    errorClass = "field-error";
    containerClass = "input-containers";


    render() {
        return (
            <>
                <div className="input-containers">
                    <label htmlFor={this.props.id}>{this.props.label} <Asterisk /></label>
                    <input
                        required
                        type={this.props.type}
                        id={this.props.id}
                        name={this.props.id}
                        value={this.props.value}
                        min={this.props.min}
                        max={this.props.max}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                        haserror={this.props.error}
                        autoFocus={this.props.autoFocus}
                    />
                    {this.props.haserror.find(id => id === this.props.id) && <div className="field-error">Error! Invalid data in field </div>} {this.props.errormessage !== "" && <span className="field-error">{this.props.errormessage}</span> }
                </div>      
            </>
        );
    }

}



export default InputField;