import { Module } from '@nestjs/common';
import { WorkspacesModule } from 'src/workspaces/workspaces.module';
import { GenerateProductionPlan } from './generatePlan.service';
import { AddOperationsToPlan } from './addOperationsToPlan.service';


@Module({
  imports: [WorkspacesModule],
  controllers: [],
  providers: [GenerateProductionPlan, AddOperationsToPlan]
})
export class PlanningModule {}
