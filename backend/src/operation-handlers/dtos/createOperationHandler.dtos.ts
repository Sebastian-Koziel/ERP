
export class CreateOperationHandlerDto {
  //info
  order_id: String
  product_id: String
  name: String
  qty: Number

  //place
  stage_id: String
  workSpace_id: String
  
  //architecture
  nextOperation_id: String
  previousOperation_id: String

  //status
  avaiable: Boolean

  //times
  doneAt: Number
  

}