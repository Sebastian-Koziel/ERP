import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb+srv://sebastiankoziel:kubeczek21@statera.myasifx.mongodb.net/?retryWrites=true&w=majority'),
      
  },
];