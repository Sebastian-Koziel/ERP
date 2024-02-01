import { Module } from '@nestjs/common';
import { OperationHandlersController } from './operation-handlers.controller';
import { OperationHandlersService } from './operation-handlers.service';
import { operationsHandlersProviders } from './operation-handlers.providers';
import { DatabaseModule } from 'src/database/database.module';
import { ProductionGraphService } from './ProductionGraphHandlers/productionGraphHandler';
import { ProductsModule } from 'src/products/products.module';


@Module({
  imports: [DatabaseModule, ProductsModule],
  controllers: [OperationHandlersController],
  providers: [OperationHandlersService, ...operationsHandlersProviders, ProductionGraphService],
  exports: [OperationHandlersService]
})
export class OperationHandlersModule {}
