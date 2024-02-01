

export class OperationHandler extends Document{
    _id: string
    order_id: string
  
    orderLine_id:  string
   
    name:  string
   
    totalQty:  number

    
  
    stage_id:  string
   
    workSpace_id:  string
   
    parentOperationHandler_id: string
   
    childrenOperationHandlers: string[]
    
    
};