import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller';
import { OperationsService } from './operations.service';
import { DatabaseModule } from 'src/database/database.module';
import { operationsProviders } from './operations.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OperationsController],
  providers: [OperationsService, ...operationsProviders]
})
export class OperationsModule {}
