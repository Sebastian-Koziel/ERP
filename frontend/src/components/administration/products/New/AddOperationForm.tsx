import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select, Text } from '@chakra-ui/react';
import { Form } from 'react-router-dom';
import { useSelect } from '../../../../hooks/form/use-select';
import { useInput } from '../../../../hooks/form/use-input';
import { ProductOperation } from '../Interfaces/ProductOperation';
import { generateTimestampId } from '../../../../utils/utils';
import { Operation } from '../../operations/Interfaces/Operations.interface';

interface AddOperationFormProps {
  operations: Operation[];
  productOperations: ProductOperation[];
  addOperation: (operation: ProductOperation) => void;
}

export const AddOperationForm: React.FC<AddOperationFormProps> = ({operations, productOperations, addOperation}) => {


    const {
        value: enteredOperation, 
        isValid: enteredOperationIsValid,
        hasError: operationInputHasError, 
        valueChangeHandler: operationChangedHandler, 
        inputBlurHandler: operationBlurHandler,
        generateOptions: operationsGenerateOptions,
        message: operationErrorMessage,
        reset: operationReset
      } = useSelect(operations,[{name: 'required'}], '');

      const { 
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError, 
        valueChangeHandler: nameChangedHandler, 
        inputBlurHandler: nameBlurHandler,
        message: nameErrorMessage,
        reset: nameReset
      } = useInput([], '');
    
      const { 
        value: enteredTimePerUnit,
        isValid: enteredTimePerUnitIsValid,
        hasError: timePerUnitInputHasError, 
        valueChangeHandler: timePerUnitChangedHandler, 
        inputBlurHandler: timePerUnitBlurHandler,
        message: timePerUnitErrorMessage,
        reset: timePerUnitReset
      } = useInput([{name: 'required'}], '');
    
      const {
        value: enteredParent, 
        isValid: enteredParentIsValid,
        hasError: stageInputHasError, 
        valueChangeHandler: parentChangedHandler, 
        inputBlurHandler: parentBlurHandler,
        generateOptions: parentGenerateOptions,
        message: parentErrorMessage,
        reset: parentReset
      } = useSelect(productOperations,[], '');

      //form validation
  let formIsValid = false;

  if (enteredOperationIsValid && enteredTimePerUnitIsValid && enteredParentIsValid && enteredNameIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const operationData:ProductOperation = {
      _id: generateTimestampId(),
      name: enteredName,
      operation_id: enteredOperation,
      timePerUnit: enteredTimePerUnit,
      parent_id: enteredParent,
      root: false
    };

    parentReset();
    nameReset();
    operationReset();
    timePerUnitReset();

    addOperation(operationData);
  };


  return (
    <Box>
    <Form onSubmit={formSubmitHandler}>
        <FormControl isRequired>
        <FormLabel>Pick operation to add</FormLabel>
          <Select
            id="operation"
            name="operation" 
            value={enteredOperation}
            onChange={operationChangedHandler}
            onBlur={operationBlurHandler}
            placeholder="Select operation"
            required
            >
          {operationsGenerateOptions()}   
          </Select>
          {!operationInputHasError? (
                <FormHelperText>
                Pick a operation for this product
                </FormHelperText>
                ) : (
                <FormErrorMessage>{operationErrorMessage}</FormErrorMessage>
                )}      
    </FormControl>
    <FormControl>
            <FormLabel>
              Name:
            </FormLabel>
              <Input
                value={enteredName}
                id="productOperationName"
                type="text"
                name="productOperationName"
                onChange={nameChangedHandler}
                onBlur={nameBlurHandler}
              />
            {!nameInputHasError? (
                <FormHelperText>
                enter name
                </FormHelperText>
                ) : (
                <FormErrorMessage>{nameErrorMessage}</FormErrorMessage>
                )}
       
      </FormControl>
    <FormControl isRequired>
    <FormLabel>Time per tick</FormLabel>
    <Input
            id="timePerUnit"
            type="number"
            name="timePerUnit"
            onChange={timePerUnitChangedHandler}
            onBlur={timePerUnitBlurHandler}
            value={enteredTimePerUnit}
            
          />
          {!timePerUnitInputHasError? (
                <FormHelperText>
                Please provide a time for tick in seconds
                </FormHelperText>
                ) : (
                <FormErrorMessage>{timePerUnitErrorMessage}</FormErrorMessage>
                )}      
    </FormControl>
    <FormControl>
        <FormLabel>Pick parent for this operation</FormLabel>
          <Select
            id="parent"
            name="parent" 
            value={enteredParent}
            onChange={parentChangedHandler}
            onBlur={parentBlurHandler}
            placeholder="Pick a parent"
            >
          {parentGenerateOptions()}   
          </Select>
          {!stageInputHasError? (
                <FormHelperText>
                Please pick a parent operation from the list
                </FormHelperText>
                ) : (
                <FormErrorMessage>{parentErrorMessage}</FormErrorMessage>
                )}      
    </FormControl>
    <Button type="submit" disabled={!formIsValid}>Add Operation</Button>
    </Form>
      
    </Box>
  );
};