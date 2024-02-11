import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DatabaseModule } from 'src/database/database.module';
import { ordersProviders } from './orders.providers';
import { ProductsModule } from 'src/products/products.module';
import { OperationHandlersModule } from 'src/operation-handlers/operation-handlers.module';
import { OperationsModule } from 'src/operations/operations.module';
import { StartOrderService } from './services/startOrder.service';





@Module({
  imports: [DatabaseModule, ProductsModule, OperationHandlersModule, OperationsModule],
  controllers: [OrdersController],
  providers: [OrdersService, ...ordersProviders, StartOrderService]
})
export class OrdersModule {}
