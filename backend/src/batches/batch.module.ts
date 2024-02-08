import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { batchProviders } from './batch.providers';
import { BatchService } from './batch.service';


@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [BatchService, ...batchProviders],
  exports: [BatchService]
})
export class BatchModule {}
