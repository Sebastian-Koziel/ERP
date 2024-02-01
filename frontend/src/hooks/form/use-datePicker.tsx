import { useState } from 'react';

type ValidatorRule = {
    name: string,
};
type ValidationRules = ValidatorRule[];

export const useDateInput = (validators: ValidationRules, prePopulate: Date | null) => {
    const parsedDate = prePopulate ? new Date(prePopulate) : new Date();
    const isValidDate = parsedDate.toString() !== 'Invalid Date';

    const [selectedDate, setSelectedDate] = useState<Date | null>(
        isValidDate ? parsedDate : null
    );
    
    const [isTouched, setIsTouched] = useState(false);

    const { valid: dateIsValid, message } = checkDateValidation(selectedDate, validators);

    const hasError = !dateIsValid && isTouched;

    const dateChangeHandler = (date: Date | null) => {
        setSelectedDate(date);
        setIsTouched(true);
    };

    const reset = () => {
        setSelectedDate(null);
        setIsTouched(false);
    };

    return {
        selectedDate,
        hasError,
        message,
        isValid: dateIsValid,
        dateChangeHandler,
        reset
    };
};

const checkDateValidation = (selectedDate: Date | null, validators: ValidationRules) => {
    for (let i = 0; i < validators.length; i++) {
        // Implement specific validations here
        // Example:
        if (validators[i].name === 'required' && !selectedDate) {
            return {
                valid: false,
                message: 'Date is required.'
            };
        }
    }
    return {
        valid: true,
        message: ''
    };
};