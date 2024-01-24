
export const required = (enteredValue: any) => {
    
    return {
        result: enteredValue !== null && enteredValue !== undefined && enteredValue.toString().trim() !== '',
        message: 'This field is required'
    } 
}

export const isNumber = (enteredValue: any) => {
    
    // Use isNaN to check if the value is not a number
    return {
      result: !isNaN(enteredValue),
      message: 'Please enter a valid number'
    };
  };