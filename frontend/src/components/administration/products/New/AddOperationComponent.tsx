import React, { useState } from 'react';
import { Box, HStack, Switch } from '@chakra-ui/react';
import { AddOperationForm } from './AddOperationForm';
import AddComponentForm from './AddComponentForm';
import { Product } from '../Interfaces/Products.interface';
import { Operation } from '../../operations/Interfaces/Operations.interface';
import { ProductOperation } from '../Interfaces/ProductOperation';
import { getObjectById } from '../../../../utils/utils';
import { EditOperationForm } from './EditOperationForm';
import { ProductComponent } from '../Interfaces/ProductComponent';
import EditComponentForm from './EditComponentForm';

interface AddOperationFormProps {
  operations: Operation[];
  productOperations: ProductOperation[];
  components: Product[];
  productComponents: ProductComponent[];
  setProductOperations:React.Dispatch<React.SetStateAction<ProductOperation[]>>
  setProductComponents:React.Dispatch<React.SetStateAction<ProductComponent[]>>
  setEditId:React.Dispatch<React.SetStateAction<string>>
  editId: string;
}

export const OperationComponentAddition: React.FC<AddOperationFormProps> = ({editId, setEditId, operations, productOperations, components, productComponents, setProductOperations, setProductComponents }) => {
  
   
    const [isShowingOperations, setIsShowingOperations] = useState(true);  
    const handleToggle = () => {setIsShowingOperations(!isShowingOperations);};

//component list handlers
  const addComponent = (component:ProductComponent) => {
  //if there no provided name - use the one of the operation
  if(component.name === ``){
    component.name = getObjectById(components, component.component_id).name;
  }
  setProductComponents([...productComponents, component]);
  };

  const deleteComponent = (id:string) => {
  
    
   const newProductComponents = productComponents.filter((item:ProductComponent) => item._id !== id);

   setProductComponents(newProductComponents);
    setEditId('');
 }

 const updateComponent = (updatedComponent: ProductComponent) => {
  const newProductComponents = productComponents.map(component => {
    if (component._id === updatedComponent._id) {
      // Update the operation
      return updatedComponent;
    }
    // Return the operation as is if it's not the one we're updating
    return component;
  });
  setProductComponents(newProductComponents);  
}

  //operation list handlers
  const addOperation = (operation:ProductOperation) => {
  //if there no provided name - use the one of the operation
  if(operation.name === ``){
    operation.name = getObjectById(operations, operation.operation_id).name;
  }
  console.log(operation)
  setProductOperations([...productOperations, operation]);
  };

  const deleteOperation = (id:string) => {
     const newProductOperations =  productOperations
     .map(item => {
      if (item.parent_id && item.parent_id === id) {
        return { ...item, parent_id: '' };
      }
      return item;
    })
    .filter((item:ProductOperation) => item._id !== id);

     setProductOperations(newProductOperations);
     setEditId('');
  }

  const updateOperation = (updatedOperation: ProductOperation) => {
    const newProductOperations = productOperations.map(operation => {
      if (operation._id === updatedOperation._id) {
        // Update the operation
        return updatedOperation;
      }
      // Return the operation as is if it's not the one we're updating
      return operation;
    });
    setProductOperations(newProductOperations);  
  }
        
  if(editId !== ''){
    if(productOperations.some(item => item._id === editId)){
    return (
      <EditOperationForm key={editId} operations={operations} productOperations={productOperations} remove={deleteOperation} update={updateOperation} setEditId={setEditId} editId={editId}/>
    )
    }else{
    return <EditComponentForm editId={editId} productOperations={productOperations} components={components} productComponents={productComponents} setEditId={setEditId} remove={deleteComponent} update={updateComponent}/>
    }
  }else{
    return (
      <Box>
          <HStack>
            <Box> Add new</Box>
              <Box>operation</Box>
          <Box>
          <Switch id="toggle-switch" isChecked={isShowingOperations} onChange={handleToggle} />
          </Box>
          <Box>Component</Box>
          </HStack>

          
          {isShowingOperations
              ? <AddComponentForm components={components} productOperations={productOperations} addComponent={addComponent}/>
              : <AddOperationForm operations={operations} productOperations={productOperations} addOperation={addOperation}  />
          }
        
    </Box>
    );
    }
};
