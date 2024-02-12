import { Injectable } from "@nestjs/common";
import { Order } from "../interfaces/order.interface";
import { OrdersService } from "../orders.service";
import { ProductsService } from "src/products/products.service";
import { createOperationHandlersForProductService } from "src/operation-handlers/services/createOperationHandlersForProduct.service";
import { AddOperationsToPlan } from "src/planning/services/addOperationsToPlan.service";
import { OperationHandlersService } from "src/operation-handlers/operation-handlers.service";


@Injectable()
export class StartOrderService {
    constructor(
        private orderService: OrdersService,
        private productService: ProductsService,
        private createOperationHandlersForProductService: createOperationHandlersForProductService,
        private operationHandlersService: OperationHandlersService,
        private AddOperationsToPlanService: AddOperationsToPlan
        ){}

    startOrder = async (orderId: string) => {
        const orderToStart:Order = await this.orderService.findOne(orderId);
        let orderLines = JSON.parse(JSON.stringify(orderToStart.products));
        // Extract product IDs from the order
        const productIds = orderLines.map(p => p.productId);
  
        // Retrieve product details
        const productsDetails = await this.productService.findMany(productIds);

        // Combine products with their quantities
        const productsToAdd = productsDetails.map(product => {
        const orderProduct = orderLines.find(p => p.productId === product._id.toString());
        return {
        ...product.toJSON(), 
        qty: orderProduct?.qty || 0,
        };
        });

        
        //for all products
        const promises = productsToAdd.map(async product => {
        //create operation handlers    
        const newOperationHandlersIds = await this.createOperationHandlersForProductService.createOperationsTreeForProduct(product, '');
        //and add them to the plan
        this.AddOperationsToPlanService.addOperationHandlersToPlan(newOperationHandlersIds);
        
        });

        await Promise.all(promises);


        return {
        statusCode: 200,
        message: 'Order has been successfuly started.',
        };
    }        

}