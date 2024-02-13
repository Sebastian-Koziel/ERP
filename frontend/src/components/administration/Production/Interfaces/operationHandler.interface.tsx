

export interface OperationHandler {

    _id: string
    order_id: string
    orderLine_id:  string
    name:  string
    totalQty:  number
    avaiableQty: number
    workspaceType_id: string
    timePerPiece: number
  
    
    //plan
    plannedStart: number | null
    plannedFinish: number | null
    stage_id:  string
    workSpace_id:  string
    calculated: boolean

    //architecture
    parentOperationHandler_id: string
    childrenOperationHandlers: string[]
    root: Boolean
};