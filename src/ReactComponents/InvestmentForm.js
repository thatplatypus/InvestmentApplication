import React, { Component } from 'react';
import '../App.css';
import { validator } from "../APICalls/InvestmentValidation";
import BusySpinner from './BusySpinner';
import InputField from './InputField';
import ChoiceField from './ChoiceField';
import InvestmentError from './InvestmentError';
import InvestmentSuccess from './InvestmentSuccess';

class InvestmentForm extends Component {
    
     
constructor() {
    super();
    this.state = {
        investmentAmount: 0,
        investmentType: "",
        netWorth: 0,
        yearlyIncome: 0,
        creditScore: 0,
        error: null,
        validated: false,
        validation: null,
        busy: false,
        fieldInError: false,
        fieldErrors: [],
        validationErrors: [],
        formComplete: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    }

    //Helper function to keep track of field errors as we're completing the form
    validateByType(field) {
        let error;

        //Lets us send any input through the validator to see if it is valid
        switch (field.type) {
            case "number":
                error = !validator.validateNumber(field.value, field.min, field.max);
                if (error) {
                    let tempErrors = this.state.fieldErrors;
                    tempErrors.push(field.id);
                    this.setState({ fieldErrors: tempErrors }, () => {
                        let remainingErrors = this.state.fieldErrors.length >= 0;
                        this.setState({ fieldInError: remainingErrors });
                    });
                    this.fieldInError(field.id);
                } else {
                    let tempValidated = this.state.fieldErrors.filter(id => id !== field.id);
                    this.setState({ fieldErrors: tempValidated }, () => {
                        let remainingErrors = this.state.fieldErrors.length > 0;
                        this.setState({ fieldInError: remainingErrors });
                    });
                }
                
            case "select-one":
                if (field.value === "") {
                    let tempErrors = this.state.fieldErrors;
                    tempErrors.push(field.id);
                    this.setState({ fieldErrors: tempErrors }, () => {
                        let remainingErrors = this.state.fieldErrors.length >= 0;
                        this.setState({ fieldInError: remainingErrors });
                    });
                }
                break;
            default: break;
        }
        
    }

    formCompleted() {
        if (this.state.investmentAmount === 0 || this.state.yearlyIncome === 0 || this.state.creditScore === 0 || this.state.netWorth === 0 || this.state.investmentType === "") {
            this.setState({ formComplete: false });
            return false;
        } else {
            this.setState({ formComplete: true });
            return true;
        }
    }

    handleChange(e) {
        const { id, value } = e.target;
        this.setState({ [id]: value });

        this.validateByType(e.target);

    }

    handleSubmit(e) {       
    }

    fieldInError(id) {
        try {
            var error = this.state.fieldErrors[id];
            if (error === undefined) return false;
            return true;
        } catch {
        }
    }

    async handleClick (e) {
        e.preventDefault();

        if (!this.formCompleted()) {
            return false;
        }
       
        var errors = this.state.fieldErrors;
        errors.forEach(err => {
            this.validateByType(err);
        })

        if (this.state.fieldInError) {
            return false;
        }

        this.setState({ busy: true });
        const response = await validator.validate(this.state);
        this.setState({ busy: false });

        /*
         * For a real API call we would want to handle the rejection side of the promise as well
         */

        if (response.error && !response.validated) {
            this.setState({ error: response.error });         
        } else if (response.validated) {
            this.setState({ validated: response.validated });
            this.setState({ validation: response.validation });
        }
        this.setState({ validationErrors: response.errorList });

        return true;
    }
      
    //Validate when focus leaves field
    handleBlur(e) {
        this.validateByType(e.target);
    }

    render() {
        return (<div className="form-container">
            { this.state.busy && <BusySpinner />}
            {this.state.error != null && <InvestmentError error={this.state.error} errors={this.state.validationErrors}/> }
            {this.state.validated && <p>{<InvestmentSuccess validation={this.state.validation}/>}</p> }
            {this.state.error == null && !this.state.validated && !this.state.busy && <><div className="form-label"><h1>Apply For a New Investment</h1><p>Please fill out all of the following information to see if you qualify. Instructions will be provided for qualifying investments.</p></div><div className="form-wrapper">
                <form target="">
                    <InputField
                        autoFocus
                        label="Investment Amount"
                        type="number"
                        id="investmentAmount"
                        value={this.state.value}
                        min="0"
                        onChange={e => this.handleChange(e)}
                        onBlur={e => this.handleBlur(e)}
                        haserror={this.state.fieldErrors}
                        errormessage=""
                        />

                    <ChoiceField
                        label="Investment Type"
                        id="investmentType"
                        value={this.state.value}
                        options={["Bond", "Stocks", "Real Estate"]}
                        onChange={e => this.handleChange(e)}
                        onBlur={e => this.handleBlur(e)}
                        haserror={this.state.fieldErrors}
                        errormessage=""
                        />

                    <InputField
                        label="Total Net Worth"
                        type="number"
                        id="netWorth"
                        min="0"
                        value={this.state.value}
                        onChange={e => this.handleChange(e)}
                        onBlur={e => this.handleBlur(e)}
                        haserror={this.state.fieldErrors}
                        errormessage=""
                    />

                    <InputField
                        label="Estimated Yearly Income"
                        htmlFor="yearlyIncome"
                        type="number"
                        id="yearlyIncome"
                        name="yearlyIncome"
                        min="0"
                        value={this.state.value}
                        onChange={e => this.handleChange(e)}
                        onBlur={e => this.handleBlur(e)}
                        haserror={this.state.fieldErrors}
                        errormessage=""
                    />

                    <InputField
                        label="Estimated Credit Score"
                        type="number"
                        id="creditScore"
                        value={this.state.value}
                        min="300"
                        max="850"
                        onChange={e => this.handleChange(e)}
                        onBlur={e => this.handleBlur(e)}
                        haserror={this.state.fieldErrors}
                        errormessage=""
                    />

                    <br />
                    <button
                        type="submit"
                        id="submitBtn"
                        className="submitBtn"
                        onClick={e => this.handleClick(e)}
                        onSubmit={e => this.handleSubmit(e)}>Submit
                    </button>
                </form>
            </div></>      
        } </div>);
    }
}

export default InvestmentForm;