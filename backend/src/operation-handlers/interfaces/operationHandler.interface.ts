

export class OperationHandler extends Document{
    
    _id: string
    order_id: string
    orderLine_id:  string
    name:  string
    totalQty:  number
    avaiableQty: number
    workspaceType_id: string
    timePerPiece: Number
  
    
    //plan
    plannedStart: Date
    plannedFinish: Date
    stage_id:  string
    workSpace_id:  string

    //architecture
    parentOperationHandler_id: string
    childrenOperationHandlers: string[]
    root: Boolean
    
    
};