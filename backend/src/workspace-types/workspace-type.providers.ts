import { Connection } from 'mongoose';
import { WorkspaceTypeSchema } from './schemas/workspaceType.schema';

export const workspaceTypesProviders = [
    {
    provide: 'WORKSPACETYPE_MODEL',
    useFactory: (connection: Connection) => connection.model('WorkspaceType', WorkspaceTypeSchema),
    inject: ['DATABASE_CONNECTION'],
    },
]