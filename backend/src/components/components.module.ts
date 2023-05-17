import { Module } from '@nestjs/common';
import { ComponentsController } from './components.controller';
import { ComponentsService } from './components.service';
import { DatabaseModule } from 'src/database/database.module';
import { componentProviders } from './component.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [ComponentsController],
  providers: [ComponentsService, ...componentProviders]
})
export class ComponentsModule {}
