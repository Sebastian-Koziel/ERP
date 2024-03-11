import { Module } from '@nestjs/common';
import { OperationHandlersController } from './operation-handlers.controller';
import { OperationHandlersService } from './operation-handlers.service';
import { operationsHandlersProviders } from './operation-handlers.providers';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsModule } from 'src/products/products.module';
import { OperationsModule } from 'src/operations/operations.module';
import { createOperationHandlersForProductService } from './services/createOperationHandlersForProduct.service';
import { PlanningModule } from 'src/planning/planning.module';
import { finishOperationHandlerService } from './services/finishOperationHandler.service';




@Module({
  imports: [DatabaseModule, ProductsModule, OperationsModule],
  controllers: [OperationHandlersController],
  providers: [OperationHandlersService, ...operationsHandlersProviders, createOperationHandlersForProductService, finishOperationHandlerService],
  exports: [OperationHandlersService, createOperationHandlersForProductService]
})
export class OperationHandlersModule {}
