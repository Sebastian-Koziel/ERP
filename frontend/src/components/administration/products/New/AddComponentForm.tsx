import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Radio, RadioGroup, Select, Stack, Text } from '@chakra-ui/react';
import { Form } from 'react-router-dom';
import { useSelect } from '../../../../hooks/form/use-select';

const AddComponentForm = ({components, productOperations}) => {
  
    const {
        value: enteredComponent, 
        isValid: enteredComponentIsValid,
        hasError: componentInputHasError, 
        valueChangeHandler: componentChangedHandler, 
        inputBlurHandler: componentBlurHandler,
        generateOptions: componentGenerateOptions,
        message: componentErrorMessage
      } = useSelect(components,[], '');
    
      const {
        value: enteredParent, 
        isValid: enteredParentIsValid,
        hasError: stageInputHasError, 
        valueChangeHandler: parentChangedHandler, 
        inputBlurHandler: parentBlurHandler,
        generateOptions: parentGenerateOptions,
        message: parentErrorMessage
      } = useSelect(productOperations,[], '');


  return (
    <Box>
    <Form>
        <FormControl>
        <FormLabel>Pick component to add</FormLabel>
          <Select
            id="enteredComponent"
            name="enteredComponent" 
            value={enteredComponent}
            onChange={componentChangedHandler}
            onBlur={componentBlurHandler}
            placeholder="Select operation"
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
    <FormControl as="fieldset">
          <FormLabel as="legend">Component Source</FormLabel>
          <RadioGroup defaultValue="manufactured">
            <Stack direction="row">
              <Radio value="manufactured" >Manufactured</Radio>
              <Radio value="fromStock">From Stock</Radio>
            </Stack>
          </RadioGroup>
    </FormControl>
    </Form>
      <Button onClick={() => {}}>Add Component</Button>
    </Box>
  );
};

export default AddComponentForm;