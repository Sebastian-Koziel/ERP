import { Body, Controller, Post, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/createNewOrder.dtos';
import { Order } from './interfaces/order.interface';
import { StartOrderDto } from './dtos/startOrder.dtos';
import { StartOrderService } from './services/startOrder.service';



@Controller('orders')
export class OrdersController {
    constructor(
        private orderService: OrdersService,
        private startOrderService: StartOrderService, 
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
        return this.startOrderService.startOrder(body.orderId);
    }

    @Delete('/:id')
    async remove(@Param('id') id:string){
        this.orderService.remove(id);
    }
}



