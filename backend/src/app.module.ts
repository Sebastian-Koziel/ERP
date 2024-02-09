import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StagesModule } from './stages/stages.module';
import { OperationsModule } from './operations/operations.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OperationHandlersModule } from './operation-handlers/operation-handlers.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { WorkspaceTypesModule } from './workspace-types/workspace-types.module';
import { PlanningModule } from './planning/planning.module';



@Module({
  imports: [UsersModule, StagesModule, OperationsModule, PlanningModule, ProductsModule, OrdersModule, OperationHandlersModule, WorkspacesModule, WorkspaceTypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
