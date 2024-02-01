import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/createNewOrder.dtos';
import { Order } from './interfaces/order.interface'; 
import { addProductDto } from './dtos/addProduct.dtos';
import { ProductsService } from 'src/products/products.service';
import { ProductionGraphService } from 'src/operation-handlers/ProductionGraphHandlers/productionGraphHandler';
import { StartOrderDto } from './dtos/startOrder.dtos';


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
    @Get()
    async findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<Order>{
        return this.orderService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Post('start')
    async startOrder(@Body() body: StartOrderDto) {
        const orderToStart:Order = await this.orderService.findOne(body.orderId);
        let productsToBeMapped = JSON.parse(JSON.stringify(orderToStart.products));
        return this.productionGraphHandler.addProductsToProduction(productsToBeMapped)
    }
}



