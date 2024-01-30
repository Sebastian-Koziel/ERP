import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dtos/create-product.dtos';


@Injectable()
export class ProductsService {
    constructor(@Inject('PRODUCT_MODEL') private productModel: Model<Product>){}

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    create(createProductDto: CreateProductDto): Promise<Product>{
        const createdProduct = this.productModel.create(createProductDto)
        return createdProduct;
    }

    async findOne(id:string): Promise<Product>{
        return await this.productModel.findById(id);
    }

    async findOneWithOutId(id:string): Promise<Product>{
        return await this.productModel.findById(id).select('-_id');
    }
    //update
    async update(id: string, attrs: Partial<Product>){
        let ProductForChange = await this.productModel.findById(id);
        if(!ProductForChange){
            throw new Error(`UPDATE - no product with this number`)
        }
        Object.assign(ProductForChange, attrs);
        return ProductForChange.save();
    }

    async remove(id:string){
        const filter = {_id : id}
        return this.productModel.deleteOne(filter);
    }

}
