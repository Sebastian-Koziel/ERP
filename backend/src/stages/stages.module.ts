import { Module } from '@nestjs/common';
import { StagesService } from './stages.service';
import { StagesController } from './stages.controller';
import { DatabaseModule } from 'src/database/database.module';
import { stageProviders } from './stages.providers';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [StagesService, ...stageProviders, AuthService],
  controllers: [StagesController]
})
export class StagesModule {}
