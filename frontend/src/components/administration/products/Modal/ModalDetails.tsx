import { Form } from "react-router-dom"

function ModalDetails(props:any){
console.log(`i get to details`)

    const formIsValid = true;
    const addOperationToTheList = props.addOperationToTheList;
    const closeModal = props.closeModal;
    let operation = props.operation;
    console.log(operation);

    const addOperationHandler = () => {
        const timePerUnitInput = document.getElementById("timePerUnit") as HTMLInputElement; //<-fix do value not bying type of htmlelement
        //fix possible null of timePerUnitInput
        if(timePerUnitInput){
        operation.timePerUnit = timePerUnitInput.value;
        //define new operation for product
        addOperationToTheList(operation)
        //close modal
        closeModal();
        }
    }

    return (
        <>
        <div>{operation.name}</div>
        <label>What is time for this operation for this product (in seconds)</label>
        <input type="number" id="timePerUnit"></input>
        <button  onClick={addOperationHandler} disabled={!formIsValid}>Add</button>
        
       
        <button onClick={closeModal}>cancel</button>
        </>
    )
}


export default ModalDetails