import { Connection } from 'mongoose';
import { OrderSchema } from './schemas/order.schema';



export const ordersProviders = [
    {
      provide: 'ORDER_MODEL',
      useFactory: (connection: Connection) => connection.model('ORDER', OrderSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ];