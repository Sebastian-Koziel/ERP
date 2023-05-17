import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DatabaseModule } from 'src/database/database.module';
import { ordersProviders } from './orders.providers';
import { ProductsModule } from 'src/products/products.module';
import { OperationHandlersModule } from 'src/operation-handlers/operation-handlers.module';
import { OperationHandlersController } from 'src/operation-handlers/operation-handlers.controller';



@Module({
  imports: [DatabaseModule, ProductsModule, OperationHandlersModule],
  controllers: [OrdersController],
  providers: [OrdersService, ...ordersProviders]
})
export class OrdersModule {}
