

export class OperationHandler extends Document{
    _id: string
    order_id: string
  
    product_id:  string
   
    name:  string
   
    qty:  number
  
    stage_id:  string
   
    workSpace_id:  string
   
    nextOperation_id: string
   
    previousOperation_id: string
    
    avaiable: boolean

    doneAt: number

    qtyDone: number
};