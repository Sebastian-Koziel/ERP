import { Connection } from 'mongoose';
import { OperationHandlerSchema } from './schemas/operationHandler.schema';




export const operationsHandlersProviders = [
    {
      provide: 'OPERATIONHANDLER_MODEL',
      useFactory: (connection: Connection) => connection.model('OperationHandler', OperationHandlerSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ];