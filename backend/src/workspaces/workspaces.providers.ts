import { Connection } from 'mongoose';
import { WorkspaceSchema } from './schemas/workspace.schema';

export const workspacesProviders = [
    {
    provide: 'WORKSPACE_MODEL',
    useFactory: (connection: Connection) => connection.model('Workspace', WorkspaceSchema),
    inject: ['DATABASE_CONNECTION'],
    },
]