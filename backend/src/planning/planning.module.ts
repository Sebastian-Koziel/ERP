import { Module } from '@nestjs/common';
import { WorkspacesModule } from 'src/workspaces/workspaces.module';
import { GenerateProductionPlan } from './services/generatePlan.service';
import { AddOperationsToPlan } from './services/addOperationsToPlan.service';
import { OperationHandlersModule } from 'src/operation-handlers/operation-handlers.module';


@Module({
  imports: [WorkspacesModule, OperationHandlersModule],
  controllers: [],
  providers: [GenerateProductionPlan, AddOperationsToPlan],
  exports: [GenerateProductionPlan, AddOperationsToPlan]
})
export class PlanningModule {}
