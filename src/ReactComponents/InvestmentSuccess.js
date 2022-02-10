import React, { Component } from 'react';
import Instructions from './Instructions';


//Component that has the success status
//This could have its own component for actual registration instead of just lorem ipsem instructions
class InvestmentSuccess extends Component {
    constructor() {
        super();
        this.state = {
            step: 1
        }

        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
    }

    handlePrevClick(e) {
        const currentStep = this.state.step;
        if (currentStep > 1) {
            this.setState({step: currentStep -1})
        }
    }

    handleNextClick(e) {
        this.setState({ step: this.state.step + 1 });
    }

    render() {
        return (<><div className="successHeader"><h1>Application Accepted</h1></div>
            <div className="successWrapper">{this.props.validation != "" && this.props.validation}
                <Instructions
                    step={this.state.step}
                />
            </div>
            <div className="successNav">
            <button
                type="button"
                id="nextBtn"
                className="submitBtn"
                onClick={e => this.handleNextClick(e)}>Next
            </button>
            <button
                type="button"
                id="prevBtn"
                className="submitBtn"
                onClick={e => this.handlePrevClick(e)}>Previous
            </button>
             </div>
        </>
    )}
}

export default InvestmentSuccess;