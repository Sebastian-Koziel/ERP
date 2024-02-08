import { Connection } from 'mongoose';
import { BatchSchema } from './schemas/batch.shema';





export const batchProviders = [
    {
      provide: 'BATCH_MODEL',
      useFactory: (connection: Connection) => connection.model('Batch', BatchSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ];