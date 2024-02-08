
export class Batch extends Document{
    _id: string
    
    operationHandler_id: string
  
    nextOperationHandler_id:  string
   
    qty:  number
  
    started:  Date

    finished:  Date

    plannedStart:  Date

    plannedEnd:  Date
    
};

