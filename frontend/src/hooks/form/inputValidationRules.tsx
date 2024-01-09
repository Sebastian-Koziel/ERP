
export const required = (enteredValue: any) => {
    return {
        result: enteredValue.trim() !== '',
        message: 'This field is required'
    } 
}

export const isNumber = (enteredValue: any) => {
    const valueAsNumber = parseFloat(enteredValue);
    return {
        result: !isNaN(valueAsNumber),
        message: `It is not a valid number`
    } 
}