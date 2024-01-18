import { useState} from 'react';
import { required, isNumber } from './inputValidationRules';

type ValidatorRule = {
    name: string
};
type ValidationRules = ValidatorRule[];

export const useSelect = (optionsArray: string[], validators:ValidationRules, prePopolutate:any) => {
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
    const generateOptions = () => {
        return optionsArray.map((option:any) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))
    }
    const valueChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(`change ${event.target.value}`)
        setEnteredValue(event.target.value);
    };

    const inputBlurHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
        generateOptions,
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
