import { Module } from '@nestjs/common';
import { WorkspaceTypesController } from './workspace-types.controller';
import { WorkspaceTypesService } from './workspace-types.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/auth/auth.service';
import { workspaceTypesProviders } from './workspace-type.providers';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [WorkspaceTypesController],
  providers: [WorkspaceTypesService, ...workspaceTypesProviders, AuthService]
})
export class WorkspaceTypesModule {}
