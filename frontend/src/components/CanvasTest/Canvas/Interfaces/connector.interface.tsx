import { OperationObject } from "../objectsModels/operation.model";

export interface ConnectorInterface {
   parent: OperationObject | null;
   child: OperationObject | null;
  
   context: CanvasRenderingContext2D;

   

}