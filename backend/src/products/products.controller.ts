
import { ProductsService } from './products.service';
import { Body, Controller, Post, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dtos/create-product.dtos';
import { Access_decorator } from 'src/auth/access.decorator';
import { Access } from 'src/auth/access.enum';
import { AccessGuard } from 'src/auth/access.guard';
import { UpdateProductData } from './interfaces/updateProduct.interface';


@Controller('products')
export class ProductsController {
    constructor(
        private productsService: ProductsService
    ){}
    @Access_decorator(Access.companySetup)
    @UseGuards(AuthGuard, AccessGuard)
    @Post('create')
    async createProduct(@Body() body: CreateProductDto) {
        return this.productsService.create(body);    
    }
    @Access_decorator(Access.companySetup)
    @UseGuards(AuthGuard, AccessGuard)
    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }
    @Access_decorator(Access.companySetup)
    @UseGuards(AuthGuard, AccessGuard)
    @Get('/:id')
    async findOne(@Param('id') id:string): Promise<Product>{
        return this.productsService.findOne(id);
    }

    @Access_decorator(Access.companySetup)
    @UseGuards(AuthGuard, AccessGuard)
    @Post('update')
    updateUser(@Body() body: UpdateProductData) {
        return this.productsService.update(body.id, body.attr);
    }
    
    @Access_decorator(Access.companySetup)
    @UseGuards(AuthGuard, AccessGuard)
    @Delete('/:id')
    async remove(@Param('id') id:string){
        this.productsService.remove(id);
    }
}
