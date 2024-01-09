import './ModalContainer.css';
import { useState } from 'react';
import ModalDetails from './ModalDetails';
import ModalList from './ModalList';

function ModalContainer(props:any){
    
    const list = props.operations;

    const close = props.close;

    const operationsForProduct = props.operationsForProduct;
    
    const addOperationToTheList = props.addOperationToTheList; 

    const [pickedOperation, setPickedOperation] = useState({});

    const [showingDetails, setShowingDetails] = useState(false);

    return (
        <>
        <div className='modalBackground'>
            <div className='modalContainer'>
        {showingDetails? <ModalDetails addOperationToTheList={addOperationToTheList} closeModal={close} operation={pickedOperation} /> : <ModalList setShowingDetails={setShowingDetails} setPickedOperation={setPickedOperation} closeModal={close} list={list}/>}
            </div>
        </div>
        </>
        
    )
}

export default ModalContainer;