import { Module } from '@nestjs/common';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';
import { DatabaseModule } from 'src/database/database.module';
import { workspacesProviders } from './workspaces.providers';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [WorkspacesController],
  providers: [WorkspacesService, ...workspacesProviders, AuthService],
  exports: [WorkspacesService]
})
export class WorkspacesModule {}
