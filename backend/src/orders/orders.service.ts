import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from './interfaces/order.interface';
import { CreateOrderDto } from './dtos/createNewOrder.dtos';
import { addProductDto } from './dtos/addProduct.dtos';
import { Product } from 'src/products/interfaces/product.interface';


@Injectable()
export class OrdersService {
    constructor(
        @Inject('ORDER_MODEL') 
        private orderModel: Model<Order>
        ){}

    async findAll(): Promise<Order[]> {
        return this.orderModel.find().exec();
    }

    async create(createOrderDto: CreateOrderDto): Promise<Order>{
        const createdOrder = this.orderModel.create(createOrderDto);
        return createdOrder;
    }

    async findOne(id:string): Promise<Order>{
        return this.orderModel.findById(id);
    }

    async remove(id:string){
        const filter = {_id : id}
        return this.orderModel.deleteOne(filter);
    }
}
