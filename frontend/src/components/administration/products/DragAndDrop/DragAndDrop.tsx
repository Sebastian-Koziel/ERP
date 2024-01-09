/*
    Simple drag and drop component made with help of this repo:
    https://github.com/asatraitis/react-hooks-dragndrop
    modified/improved so it fits my needs.
*/


import { useRef, useState, useEffect } from 'react';
import './DragAndDrop.css'

import ModalContainer from '../Modal/ModalContainer';
import { Operation } from '../../operations/Interfaces/Operations.interface';



function DragAndDrop(props: any){
    
    //list of avaible operations 
    const operations = props.operations;

    //list of operations for this product
    const list = props.list;
    const setList = props.setList;
    

    //const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    
    /* useEffect(() => {
        setList(data);
    }, [setList, data]) */

    const dragItem = useRef();
    const dragedNode = useRef<HTMLDivElement | null>();

    const handleDragStart = (e:React.DragEvent, params:any) => {
        
        //draged html node
        dragedNode.current = e.target as HTMLDivElement;
        dragedNode.current.addEventListener('dragend', handleDragEnd);
        
        //x and y of draged node from array
        dragItem.current = params;

        setTimeout(()=> {
            setDragging(true);
        }, 0)    
    }

    const handleDragEnter = (e, targetItem) => {
        
        const currentItem = dragItem.current;
        
        if(e.target !== dragedNode.current){
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                
                //const node = newList[dragItem.current.grpId].items.splice(dragItem.current.itemId,1)[0];
                //console.log(node);
                //console.log(JSON.parse(JSON.stringify(newList)));
                //newList[targetItem.grpId].items.splice(targetItem.itemId,0,node);
                //console.log(JSON.parse(JSON.stringify(newList)));

                
                newList[targetItem.grpId].items.splice(targetItem.itemId, 0, newList[currentItem.grpId].items.splice(currentItem.itemId,1)[0]);
                
                dragItem.current = targetItem;
                
                //localStorage.setItem('List', JSON.stringify(newList));
                return newList
            })
        }
    }

    const handleDragEnd = () => {
        setDragging(false);

        dragItem.current = null;

        dragedNode.current.removeEventListener('dragend', handleDragEnd);
        dragedNode.current = null;
    
    }

    const getStyles=(params:any)=>{
        if(dragItem.current.grpId === params.grpId && dragItem.current.itemId === params.itemId){
        return 'current dnd-item'
        }
        return 'dnd-item';
    }


    //modal handlers
    const addOperationButtonHandler = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    const addOperationToTheList = (newOperation:Operation) => {
        let newList = JSON.parse(JSON.stringify(list));
        newList[0].items.push(newOperation);
        setList(newList);
    }

    const removeItemHandler = (e:React.MouseEvent, params:any) => {
        let newList = JSON.parse(JSON.stringify(list));
        newList[params.grpId].items.splice(params.itemId, 1);
        
        setList(newList);
    }

    return (
        <>
        <div className='App'>
            <div className='App-header'>
                <div className='drag-n-drop'>
                {list.map((grp, grpId)=>(
                    <div key={grpId} className='dnd-group'>
                        {grp.items.map((item, itemId) => (
                            <div 
                            draggable 
                            onDragEnter={dragging?(e)=>{handleDragEnter(e, {grpId, itemId})}:null}
                            onDragStart={(e)=> {handleDragStart(e, {grpId, itemId})}} 
                            key={itemId} 
                            className={dragging?getStyles({grpId, itemId}):'dnd-item'}>
                                {item.name} 
                                <button >___edit___</button>
                                <button onClick={(e)=>{removeItemHandler(e, {grpId, itemId})}}>remove</button>
                            </div>
                        ))}
                    </div>
                ))}  
                </div>
                <button onClick={addOperationButtonHandler} className='dnd-button'>Add operation</button>
            </div>
            
        </div>
        {modalOpen && <ModalContainer addOperationToTheList={addOperationToTheList} close={closeModal} operations={operations}/>}
        </>
    )
}

export default DragAndDrop