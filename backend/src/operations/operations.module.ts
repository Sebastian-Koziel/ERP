import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller';
import { OperationsService } from './operations.service';
import { DatabaseModule } from 'src/database/database.module';
import { operationsProviders } from './operations.providers';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [OperationsController],
  providers: [OperationsService, ...operationsProviders, AuthService],
  exports: [OperationsService]
})
export class OperationsModule {}
