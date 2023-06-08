import { Connection } from 'mongoose';
import { StageSchema } from './schemas/stage.schema';


export const stageProviders = [
    {
    provide: 'STAGE_MODEL',
    useFactory: (connection: Connection) => connection.model('Stage', StageSchema),
    inject: ['DATABASE_CONNECTION'],
    },
]