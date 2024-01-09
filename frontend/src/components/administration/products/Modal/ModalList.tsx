import { Operation } from "../../operations/Interfaces/Operations.interface";
import { getObjectById } from "../../../../utils/utils";


function ModalList (props:any) {

    const list = props.list; 
    const closeModal = props.closeModal;
    const setShowingDetails = props.setShowingDetails;
    const setPickedOperation = props.setPickedOperation;

    const operationClickHandler = (e:React.MouseEvent<HTMLDivElement>)=>{
        console.log(e.currentTarget.id);
        //pass info to details
        setPickedOperation(getObjectById(list, e.currentTarget.id));
        //change state to details
        setShowingDetails(true);
    }
    console.log('jestem w list', list)
    return (
        <>
        
            {list.map((op: Operation, opId: number)=>(
                
                    <div className='modalOpListNode' id={op._id} onClick={operationClickHandler} key={opId}>{op.name}</div>
                
            ))}
            <button className="modalCloseButton" onClick={closeModal}>cancel</button>
       
        </>
        
    )
}

export default ModalList