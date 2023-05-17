import { Connection } from 'mongoose';
import { ComponentSchema } from './schemas/component.schema';



export const componentProviders = [
    {
      provide: 'COMPONENTS_MODEL',
      useFactory: (connection: Connection) => connection.model('Component', ComponentSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ];