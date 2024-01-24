import { Product } from "../Interfaces/Products.interface";

const addComponent = (component:Product) => {
    //if there no provided name - use the one of the operation
    setProductOperations([...productOperations, operation]);
    };
  
/* const deleteOperation = (id:string) => {
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
    } */