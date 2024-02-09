
export class CreateOperationHandlerDto {
  //info
  order_id: String
  orderLine_id: String
  name: String
  totalQty: Number
  avaiableQty: Number

  workspaceType_id: string
  timePerPiece: number
  


  //architecture
  parentOperationHandler_id: String
  root: boolean
  
  

}




