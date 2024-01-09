import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/createNewOrder.dtos';
import { Order } from './interfaces/order.interface'; 
import { addProductDto } from './dtos/addProduct.dtos';
import { ProductsService } from 'src/products/products.service';
import { OperationHandlersService } from 'src/operation-handlers/operation-handlers.service';
import { ProductionGraphService } from 'src/operation-handlers/ProductionGraphHandlers/productionGraphHandler';
import { StartOrder } from './interfaces/startOrder.interface';





@Controller('orders')
export class OrdersController {
    constructor(
        private orderService: OrdersService,
        private productService: ProductsService,
        private productionGraphHandler: ProductionGraphService 
    ){}

    @UseGuards(AuthGuard)
    @Post('create')
    async createNewOrder(@Body() body: CreateOrderDto){
        return this.orderService.create(body);  
    }

    @UseGuards(AuthGuard)
    @Post('addproduct')
    async addProduct(@Body() body: addProductDto){
        const productType = await this.productService.findOneWithOutId(body.productType_id);
        if(!productType){
            //TO DO - add proper error
            console.log('brak produktu')
        }
        return this.orderService.addProduct(body, productType);        
    }


    @UseGuards(AuthGuard)
    @Post('start')
    async startOrder(@Body() body: StartOrder) {
        const orderToStart = await this.orderService.findOne(body.order_id);
        console.log(`got order`)
        //for each product/component create and map operations
        let productsToBeMapped = JSON.parse(JSON.stringify(orderToStart.products));
        console.log(`dodaje produkty`)
        while(productsToBeMapped.length){
            let product = productsToBeMapped.pop();
            this.productionGraphHandler.createGraphForProduct(product, orderToStart._id);
        }
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<Order>{
        console.log(`szukam order`)
        return this.orderService.findOne(id);
    }
}



