export const validator = {
    validate,
    validated: false,
    error: null,
    validation: null,
    validateNumber,
    validateNumberLow,
    validateNumberHigh
}

async function validate(data) {
    const result = await validateInternal(data);
    //Simulated 2 second sleep for a busy spinner state and API call simulation
    await sleep(2000);
    return result;
}

//This call could be replaced by the API call for validation.
//The other simple form validations are in other functions so this could just be swapped.
function validateInternal(data) {
    var promise = new Promise((resolve, reject) => {
        let result = { error: "", validated: false, validation: null , errorList: null};
        let errors = [];
         resolve(result);
        {
            let badRequest = validateAmount(data.investmentAmount, 9000000);
            if (badRequest !== "") {
                result.error = "Bad Request - Investment Amount Too Large";
                result.validated = false;
                resolve(result);
                return promise;
            }

            errors.push(validateYearlyIncome(data.investmentAmount, data.yearlyIncome, 5));
            errors.push(validateCreditScoreMinimum(data.creditScore, 300, 850, 600));
            errors.push(validateNetWorth(data.investmentAmount, data.netWorth, 0.03));

            for (let e of errors) {
                if (e !== "") {
                    result.error = e
                }
            }

            if (result.error !== "") {
                result.error = "Error validating investment. Please contact customerservice@example.com. Your application may have not been accepted because of the following:";
                result.validated = false;
            } else {
                result.validation = "Congratulations! You qualify. Please follow these steps to register for an account.";
                result.validated = true;
            }
            
            result.errorList = errors.filter(function (err) {
                return err != null && err !== "";
            });
            resolve(result);
        }
        
    });

    return promise;
}

function validateYearlyIncome(amount, yearlyIncome, incomeDivisor) {
    //Functions can be easier to write test cases against, and it can be an easier source to validate inputs
    if (incomeDivisor <= 0) {
        //This could be thrown or logged
        //Console.Log("Cannot divide Yearly Income by 0");
        return "";
    }

    if (amount > yearlyIncome / incomeDivisor) {
        return "Investment too large for yearly income";
    }

    return ""
}

function validateNumber(number, lower, upper) {
    number = parseInt(number);
    lower = parseInt(lower);
    upper = parseInt(upper);
    if (!upper) {
        return validateNumberLow(number, lower);
    } else if (!lower) {
        return validateNumberHigh(number, upper);
    } else {
        return (number >= lower && number <= upper);
    }
}

function validateNumberLow(number, lower) {
    if (!lower) {
        return true;
    }
    return number >= lower;
}

function validateNumberHigh(number, upper) {
    if (!upper) {
        return true;
    }
    return number <= upper;
}

function validateCreditScoreMinimum(creditScore, lower, upper, minimum) {

    if (creditScore < lower) {
        return "Credit score is lower than minimum credit score";
    }

    if (creditScore > upper) {
        return "Credit score is greater than maximum credit score";
    }

    if (creditScore < minimum) {
        return "Credit score is lower than the minimum required credit score";
    }

    return ""
}

function validateNetWorth(amount, netWorth, percentOfWorth) {

    if (amount > netWorth * percentOfWorth) {
        return "Amount is greater than allowed for your net worth";
    }

    return ""
}

function validateAmount(amount, maxInvestment) {

    if (amount > maxInvestment) {
        return "Amount is greater than maximum investment allowed";
    }

    return ""
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


