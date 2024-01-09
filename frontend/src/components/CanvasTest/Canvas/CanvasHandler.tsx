import Canvas from "./Canvas"
import { Keys } from "./Interfaces/operationObject.interface";
import { Connector } from "./objectsModels/connector.model";
import { OperationObject } from "./objectsModels/operation.model";

let ctxRef:CanvasRenderingContext2D;
let keys:Keys = {
    'Control':false,
    'Alt': false
}

let objectsInCanvas:OperationObject[] = [];
let connectors:Connector[] = [];


//drag handlers
let isDraggin:boolean = false;
let draggedObject:OperationObject | null = null; 

//connecting handlers
let tempConnector:Connector | null = null;
let isConnecting:boolean = false;
let connectingFirstObject:OperationObject | null = null;
let connectingSecondObject:OperationObject | null = null;

let testObject:OperationObject = new OperationObject(keys);
objectsInCanvas.push(testObject);

function CanvasHandler() {
  const draw = (context: CanvasRenderingContext2D,count: number) => {
    ctxRef = context;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    context.fillStyle = 'grey'
    const d = count % 800
    context.fillRect(10 +d , 10  , 100 , 100)

    for(let object of objectsInCanvas){
       object.render(context)
    }
    if(tempConnector){
    tempConnector.render();
    }
  }

const onMouseDown = (event:any) => {
    //console.log(event);
    const mouseX = parseInt(event.offsetX);
    const mouseY = parseInt(event.offsetY);
    
    //check all objects
    for(let object of objectsInCanvas){
        //if object is clicked and alt pressed
        if(object.isMouseOver && keys.Alt && !keys.Control){
            isDraggin = true;
        }
        if(object.isMouseOver && keys.Control && !keys.Alt && !isConnecting){
            isConnecting = true;
            console.log(isConnecting);
            //create temp connector
            tempConnector = new Connector(ctxRef, object);
        }
     }
}

const onMouseUp = (event:any) => {
    event.preventDefault();
    if(isDraggin){
        isDraggin = false;
    }
    if(isConnecting){
        isConnecting = false;
        console.log(isConnecting);
    }

}

const onMouseMove = (event:any) => {
    //mouse cordinates
    const mouseX = parseInt(event.offsetX);
    const mouseY = parseInt(event.offsetY);
    //check all nodes if mouse is over them
    if(isConnecting){
        tempConnector.mouseX = mouseX;
        tempConnector.mouseX = mouseY;
    }
    for(let object of objectsInCanvas){
        //if object is clicked
        if(object.mouseOver(mouseX, mouseY)){
            object.isMouseOver =  true;
            if(isDraggin){
                object.calculateNewCoordinates(mouseX, mouseY);
            }        
        }
        else {
            object.isMouseOver =  false;
        }
    }
}
const onKeyDown = (event:KeyboardEvent) => {
    if(event.key === 'Control'){
        keys.Control = true;
    }
    if(event.key === 'Alt'){
        keys.Alt = true;
    }
}

const onKeyUp = (event:KeyboardEvent) => {
    if(event.key === 'Control'){
        keys.Control = false;
    }
    if(event.key === 'Alt'){
        keys.Alt = false;
    }
}



  return <div>
    <Canvas 
    onKeyDown={onKeyDown}
    onKeyUp={onKeyUp}
    onClick={onMouseDown}
    onMouseUp={onMouseUp}
    onMouseMove={onMouseMove} 
    draw={draw} 
    width="800" height="800" style={{marginLeft: '20%', border:'1px solid black'}}/>
  </div>
}

export default CanvasHandler;