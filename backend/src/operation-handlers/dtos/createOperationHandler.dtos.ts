
export class CreateOperationHandlerDto {
  //info
  order_id: String
  orderLine_id: String
  name: String
  totalQty: Number
  avaiableQty: Number
  
  //architecture
  parentOperationHandler_id: String
  root: boolean
  
  

}