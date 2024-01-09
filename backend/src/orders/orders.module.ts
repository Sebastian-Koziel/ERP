import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DatabaseModule } from 'src/database/database.module';
import { ordersProviders } from './orders.providers';
import { ProductsModule } from 'src/products/products.module';
import { OperationHandlersModule } from 'src/operation-handlers/operation-handlers.module';
import { ProductionGraphService } from 'src/operation-handlers/ProductionGraphHandlers/productionGraphHandler';



@Module({
  imports: [DatabaseModule, ProductsModule, OperationHandlersModule],
  controllers: [OrdersController],
  providers: [OrdersService, ...ordersProviders, ProductionGraphService]
})
export class OrdersModule {}
