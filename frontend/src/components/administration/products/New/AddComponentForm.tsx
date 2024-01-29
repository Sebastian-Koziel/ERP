import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Radio, RadioGroup, Select, Stack, Text } from '@chakra-ui/react';
import { Form } from 'react-router-dom';
import { useSelect } from '../../../../hooks/form/use-select';
import { ProductComponent } from '../Interfaces/ProductComponent';
import { ProductOperation } from '../Interfaces/ProductOperation';
import { Product } from '../Interfaces/Product.interface';
import { generateTimestampId } from '../../../../utils/utils';
import { useInput } from '../../../../hooks/form/use-input';

interface AddOperationFormProps {
  components: Product[];
  productOperations: ProductOperation[];
  addComponent: (component: ProductComponent) => void;
}

const AddComponentForm:React.FC<AddOperationFormProps> = ({components, productOperations, addComponent}) => {
  
    const {
        value: enteredComponent, 
        isValid: enteredComponentIsValid,
        hasError: componentInputHasError, 
        valueChangeHandler: componentChangedHandler, 
        inputBlurHandler: componentBlurHandler,
        generateOptions: componentGenerateOptions,
        message: componentErrorMessage,
        reset: enteredComponentReset
      } = useSelect(components,[{name: 'required'}], '');

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

    if (enteredComponentIsValid && enteredParentIsValid && enteredNameIsValid) {
      formIsValid = true;
    }
  
    const formSubmitHandler = (event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); 
      const componentData:ProductComponent= {
        _id: generateTimestampId(),
        name: enteredName,
        component_id: enteredComponent,
        parent_id: enteredParent
      };
  
      enteredComponentReset();
      parentReset();
      nameReset();
  
      addComponent(componentData);
    };

  return (
    <Box>
    <Form onSubmit={formSubmitHandler}>
        <FormControl isRequired>
        <FormLabel>Pick component to add</FormLabel>
          <Select
            id="enteredComponent"
            name="enteredComponent" 
            value={enteredComponent}
            onChange={componentChangedHandler}
            onBlur={componentBlurHandler}
            placeholder="Select component"
            >
          {componentGenerateOptions()}   
          </Select>
          {!stageInputHasError? (
                <FormHelperText>
                Pick a component for this product
                </FormHelperText>
                ) : (
                <FormErrorMessage>{componentErrorMessage}</FormErrorMessage>
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

    <FormControl>
        <FormLabel>Pick a component to be used in this product</FormLabel>
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
      <Button disabled={formIsValid} type="submit" >Add Component</Button>
    </Form>
      
    </Box>
  );
};

export default AddComponentForm;