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
        private orderModel: Model<Order>,
        ){}

    async findAll(): Promise<Order[]> {
        return this.orderModel.find().exec();
    }

    
    async create(createOrderDto: CreateOrderDto, newProducts:Product[]): Promise<Order>{
        const createdOrder = await this.orderModel.create(createOrderDto);
        newProducts.map((newProduct)=>{
            console.log(`wrzucam nowy produkt to stworzonego zamowienia`)
            createdOrder.products.push(newProduct);
        })
        console.log(createdOrder);
        createdOrder.save();
        return createdOrder;
    }

    async findOne(id:string): Promise<Order>{
        return this.orderModel.findById(id);
    }

    async remove(id:string){
        const filter = {_id : id}
        return this.orderModel.deleteOne(filter);
    }

    async addProduct(addProduct: addProductDto, product: Product){
        const order = await this.orderModel.findById(addProduct.order_id);
        if(!order){
            //TO DO - add proper error
            console.log('no order with this no')
        }
        
        product.qty = addProduct.qty;
        order.products.push(product);
        order.save();
    }
}
