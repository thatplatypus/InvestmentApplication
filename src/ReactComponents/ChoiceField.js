import React, { Component } from 'react';
import Asterisk from './Asterisk';
import '../App.css';

//Wrapper for choice fields to style the whole component
class ChoiceField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false
        };

    }

    render() {
        return (
            <>
                <div className="input-containers">
                    <label htmlFor={this.props.labelFor}>{this.props.label} <Asterisk /></label>
                    <select
                        required
                        id={this.props.id}
                        name={this.props.name}
                        onChange={this.props.onChange}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                        haserror={this.props.error}
                    >
                        {
                            this.props.options.map((option, key) =>
                                <option key={key}>{option}</option>)
                        }
                    </select>
               </div>
            </>
        );
    }
}

export default ChoiceField;