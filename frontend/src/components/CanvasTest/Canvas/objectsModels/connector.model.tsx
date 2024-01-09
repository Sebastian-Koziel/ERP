import { ConnectorInterface } from "../Interfaces/connector.interface";
import { OperationObject } from "./operation.model"




export class Connector implements ConnectorInterface {
    parent: OperationObject | null;
    child: OperationObject | null;
    context: CanvasRenderingContext2D;

    constructor (ctx:CanvasRenderingContext2D, parent:OperationObject) {
        this.context = ctx;
        this.parent = null;
        this.child = null;
        this.mouseX = null;
        this.mouseY = null;
    }

    render(){

    }

    drawArrow(fromx:number, fromy:number, tox:number, toy:number, arrowWidth:number, color:string){
        //variables to be used when creating the arrow
        var headlen = 10;
        var angle = Math.atan2(toy-fromy,tox-fromx);
     
        this.context.save();
        this.context.strokeStyle = color;
     
        //starting path of the arrow from the start square to the end square
        //and drawing the stroke
        this.context.beginPath();
        this.context.moveTo(fromx, fromy);
        this.context.lineTo(tox, toy);
        this.context.lineWidth = arrowWidth;
        this.context.stroke();
     
        //starting a new path from the head of the arrow to one of the sides of
        //the point
        this.context.beginPath();
        this.context.moveTo(tox, toy);
        this.context.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
                   toy-headlen*Math.sin(angle-Math.PI/7));
     
        //path from the side point of the arrow, to the other side point
        this.context.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),
                   toy-headlen*Math.sin(angle+Math.PI/7));
     
        //path from the side point back to the tip of the arrow, and then
        //again to the opposite side point
        this.context.lineTo(tox, toy);
        this.context.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
                   toy-headlen*Math.sin(angle-Math.PI/7));
     
        //draws the paths created above
        this.context.stroke();
        this.context.restore();
    }
}