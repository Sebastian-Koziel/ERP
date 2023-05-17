import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Product } from 'src/products/interfaces/product.interface';
import { ProductsService } from 'src/products/products.service';


@Injectable()
export class CheckAndAddComponents implements PipeTransform {
    constructor(private productService: ProductsService){}

    async transform(value: any, metadata: ArgumentMetadata) {

        /* //get product from id
        //const product = await this.getProduct(value.product.type);
        console.log(product);
        //check if we got product with this ID
        if(product){
            //check product if it has a components
            //if(!product.components.length){
            //if it doesn`t return 
                return value;
            } 
            else{
            //if it does add components and than return
            value.components = [];
            for (let i=0;i<product.components.length;i++){
                const component = {
                    //id: product.components[i].id,
                    //qty: product.components[i].qty * value.product.qty,
                }
                value.components.push(component);
            }
                return value;
            }
        }
        else {
            throw new BadRequestException('no such product');
        }
      //console.log('Request body:', value);
      */
    }

    async getProduct(id:string):Promise<Product>{
        return this.productService.findOne(id);
    }
  } 