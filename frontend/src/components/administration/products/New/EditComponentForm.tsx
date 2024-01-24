import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select, Text } from '@chakra-ui/react';
import { Form } from 'react-router-dom';
import { useSelect } from '../../../../hooks/form/use-select';
import { useInput } from '../../../../hooks/form/use-input';
import { ProductOperation } from '../Interfaces/ProductOperation';
import { generateTimestampId, getObjectById } from '../../../../utils/utils';
import { Operation } from '../../operations/Interfaces/Operations.interface';
import { Product } from '../Interfaces/Products.interface';
import { ProductComponent } from '../Interfaces/ProductComponent';


interface AddOperationFormProps {
  components: Product[]
  productOperations: ProductOperation[]
  editId: string
  productComponents: ProductComponent[]
  setEditId:React.Dispatch<React.SetStateAction<string>>
  remove: (id: string) => void;
  update: (component: ProductComponent) => void;
}

const EditComponentForm: React.FC<AddOperationFormProps> = ({editId, components, productOperations, productComponents, setEditId, update, remove}) => {

    const componentToEdit = getObjectById(productComponents, editId);

    const handleRemoveClick = () => {
        remove(componentToEdit._id);
      };

    const {
        value: enteredComponent, 
        isValid: enteredComponentIsValid,
        hasError: componentInputHasError, 
        valueChangeHandler: componentChangedHandler, 
        inputBlurHandler: componentBlurHandler,
        generateOptions: componentGenerateOptions,
        message: componentErrorMessage,
        reset: enteredComponentReset
      } = useSelect(components,[{name: 'required'}], componentToEdit.component_id);

      const { 
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError, 
        valueChangeHandler: nameChangedHandler, 
        inputBlurHandler: nameBlurHandler,
        message: nameErrorMessage,
        reset: nameReset
      } = useInput([], componentToEdit.name);

      const {
        value: enteredParent, 
        isValid: enteredParentIsValid,
        hasError: stageInputHasError, 
        valueChangeHandler: parentChangedHandler, 
        inputBlurHandler: parentBlurHandler,
        generateOptions: parentGenerateOptions,
        message: parentErrorMessage,
        reset: parentReset
      } = useSelect(productOperations,[], componentToEdit.parent_id);

    //form validation
    let formIsValid = false;

    if (enteredComponentIsValid && enteredParentIsValid && enteredNameIsValid) {
      formIsValid = true;
    }
  
    const formSubmitHandler = (event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); 
      const componentData:ProductComponent= {
        _id: componentToEdit._id,
        name: enteredName,
        component_id: enteredComponent,
        parent_id: enteredParent
      };
  
      if(componentData.name === ``){
        componentData.name = getObjectById(components, componentData.component_id).name;
      }
    update(componentData);
    setEditId('');
    };
     




    return (
        <Box>
            <Button onClick={handleRemoveClick}>Remove</Button>
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
          <Button disabled={formIsValid} type="submit" >Change</Button>
        </Form>
          
        </Box>
      );
};

export default EditComponentForm