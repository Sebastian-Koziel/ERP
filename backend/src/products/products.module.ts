import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productProviders } from './products.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...productProviders],
  exports: [ProductsService]
})
export class ProductsModule {}
