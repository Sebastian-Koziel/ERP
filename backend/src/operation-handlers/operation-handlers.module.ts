import { Module } from '@nestjs/common';
import { OperationHandlersController } from './operation-handlers.controller';
import { OperationHandlersService } from './operation-handlers.service';
import { operationsHandlersProviders } from './operation-handlers.providers';
import { DatabaseModule } from 'src/database/database.module';
import { ProductionGraphService } from './ProductionGraphHandlers/productionGraphHandler';
import { ProductsModule } from 'src/products/products.module';
import { PlanningHandler } from 'src/planning/generatePlan';



@Module({
  imports: [DatabaseModule, ProductsModule],
  controllers: [OperationHandlersController],
  providers: [OperationHandlersService, ...operationsHandlersProviders, ProductionGraphService, PlanningHandler],
  exports: [OperationHandlersService]
})
export class OperationHandlersModule {}
