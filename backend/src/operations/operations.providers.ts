import { Connection } from 'mongoose';
import { OperationSchema } from './schemas/operation.schema';

export const operationsProviders = [
    {
      provide: 'OPERATION_MODEL',
      useFactory: (connection: Connection) => connection.model('Operation', OperationSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ];