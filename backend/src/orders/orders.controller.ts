import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/createNewOrder.dtos';
import { Order } from './interfaces/order.interface'; 
import { addProductDto } from './dtos/addProduct.dtos';
import { ProductsService } from 'src/products/products.service';
import { OperationHandlersService } from 'src/operation-handlers/operation-handlers.service';




@Controller('orders')
export class OrdersController {
    constructor(
        private orderService: OrdersService,
        private productService: ProductsService,
        private operationHandlerService: OperationHandlersService,
        
    ){}

    @UseGuards(AuthGuard)
    @Post('createneworder')
    async createNewOrder(@Body() body: CreateOrderDto){
        let newProducts = [];
        body.products_types.map(async (product)=>{
            const newProduct = await this.productService.findOneWithOutId(product.product_type);
            newProduct.qty = product.qty;
            console.log(newProduct)
            newProducts.push(newProduct);
        })
        
        return this.orderService.create(body, newProducts);
        
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
    @Get('start/:id')
    async startOrder(@Param('id') id:string) {
        const orderToStart = await this.orderService.findOne(id);
        //for each product/component create and map operations
        let productsToBeMapped = JSON.parse(JSON.stringify(orderToStart.products));
        console.log(`dodaje produkty`)
        while(productsToBeMapped.length){
            let product = productsToBeMapped.pop();
            this.operationHandlerService.createTreeForProduct(product, orderToStart._id);
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
        return this.orderService.findOne(id);
    }
}



