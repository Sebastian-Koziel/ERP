
import { ProductsService } from './products.service';
import { Body, Controller, Post, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dtos/create-product.dtos';


@Controller('products')
export class ProductsController {
    constructor(
        private productsService: ProductsService
    ){}

    @UseGuards(AuthGuard)
    @Post('create')
    async createProduct(@Body() body: CreateProductDto) {
        return this.productsService.create(body);
        
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<Product>{
        return this.productsService.findOne(id);
    }
}
