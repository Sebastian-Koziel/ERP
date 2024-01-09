import { Keys, OperationObjectInterface } from "../Interfaces/operationObject.interface";

export class OperationObject implements OperationObjectInterface{

    x: number;
    y: number;
    width: number;
    height: number;
    isMouseOver: boolean;
    isOverLeftSide: boolean;
    isOverRightSide: boolean;
    isDragged: boolean;
    isConnecting: boolean;
    borderColor: string;
    showConnectState: boolean;
    keyState: Keys;

    constructor (keysState:Keys) {
       this.x = 20;
       this.y = 20;
       this.width = 150;
       this.height = 50;
       this.borderColor = '';
       //mouseover
       this.isMouseOver = false 
       this.isOverLeftSide = false
       this.isOverRightSide = false
       //dragg
       this.isDragged = false;
       //connecting
       this.isConnecting = false;
       this.showConnectState = false;
       this.keyState = keysState;
    }

    mouseOver(x:number, y:number){
        
        const shape_left = this.x;
        const shape_right = this.x + this.width;
        const shape_top = this.y;
        const shape_down = this.y + this.height;

        this.isOverLeftSide = false;
        this.isOverRightSide = false;

       

        if(x > shape_left && x < shape_right && y > shape_top && y < shape_down){
            if(x < this.x + this.width/2){
                this.isOverLeftSide = true;
            }
            else {
                this.isOverRightSide = true;
            }
            return true;
        }
    }
    calculateNewCoordinates(newX:number,newY:number) {
        this.x = newX - this.width/2;
        this.y = newY - this.height/2;
    }
    render(context:CanvasRenderingContext2D){
        if(this.isMouseOver){
            if(this.keyState.Control && !this.keyState.Alt){
                this.drawConnectingState(context);
            }
        }
        this.drawNormalState(context);
           
    }
    drawNormalState(context:CanvasRenderingContext2D){
        context.fillStyle = 'grey'
        context.strokeRect(this.x , this.y  , this.width , this.height)
    }
    drawConnectingState(context:CanvasRenderingContext2D){    
        const halfWidth = this.width / 2;
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        
        // Left side (connect to parent)
        context.fillStyle = 'lightblue'; // Change the background color
        context.fillRect(this.x, this.y, halfWidth, this.height);
        
        context.fillStyle = 'black'; // Change the text color
        context.fillText('As parent', this.x + 10, this.y + this.height / 2);
        
        // Right side (connect to child)
        context.fillStyle = 'lightgreen'; // Change the background color
        context.fillRect(this.x + halfWidth, this.y, halfWidth, this.height);
        
        context.fillStyle = 'black'; // Change the text color
        context.fillText('As child', this.x + this.width/2 + 10, this.y + this.height / 2);
        
    }
    glowOnMouseOver(context: CanvasRenderingContext2D) {
        if (this.isMouseOver) {
            // Draw the normal state with a golden glow when the mouse is over
            context.fillStyle = 'grey';
            context.strokeStyle = 'gold'; // Set the border color to golden
            context.lineWidth = 3; // Adjust the border width as needed
    
            // Draw a slightly scaled-up version with a blur effect
            const blurFactor = 1.2; // Adjust this factor for the desired blur effect
            context.shadowColor = 'gold'; // Set the shadow color to golden
            context.shadowBlur = 10 * blurFactor; // Adjust the shadow blur radius
            context.fillRect(this.x - this.width * (blurFactor - 1) / 2, this.y - this.height * (blurFactor - 1) / 2, this.width * blurFactor, this.height * blurFactor);
    
            // Draw the object with a golden border
            context.strokeStyle = 'gold'; // Set the border color to golden
            context.strokeRect(this.x, this.y, this.width, this.height);
        } else {
            // Draw the normal state if the mouse is not over
            this.drawNormalState(context);
        }
    }
}