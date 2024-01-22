import { useState} from 'react';
import { required, isNumber } from './inputValidationRules';

type ValidatorRule = {
    name: string
};
type ValidationRules = ValidatorRule[];

export const useInput = (validators:ValidationRules, prePopolutate:any) => {
    const [enteredValue, setEnteredValue] = useState(prePopolutate);
    const [isTouched, setIsTouched] = useState(false); 

    const {
        valid: valueIsValid,
        message
     } = checkValidation(enteredValue, validators);

    const valueBeforeEdit = prePopolutate;

    const hasError =  !valueIsValid && isTouched;

    const cancelEdit = () => {
        setEnteredValue(valueBeforeEdit);
    }

    const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEnteredValue(event.target.value);
    };

    const inputBlurHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsTouched(true);
        
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }
    return {
        value: enteredValue,
        hasError,
        message,
        isValid: valueIsValid,
        valueChangeHandler,
        inputBlurHandler,
        cancelEdit,
        reset
    };
}


const checkValidation = (enteredValue:any, validators:ValidationRules) => { 
    for(let i=0;i<validators.length;i++){
        let f;
        if(validators[i].name === 'required'){
            f = required(enteredValue);
        }
        if(validators[i].name === 'isNumber'){
            f = isNumber(enteredValue);
        }
        if(f && !f.result){
            return {
                valid: false,
                message: f.message
            }
        }
    }
    return {
        valid: true,
        message: ''
    }   
}
