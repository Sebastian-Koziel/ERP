import { ResourceMap } from './ResourceTypes';

export const apiResources: Record<keyof ResourceMap, { path: string; error: string }> = {
  stages: {
    path: 'http://localhost:3000/stages',
    error: 'Something went wrong with fetching stages',
  },
  workspaces: {
    path: 'http://localhost:3000/workspaces',
    error: 'Something went wrong with fetching workspaces',
  },
  workspaceTypes: {
    path: 'http://localhost:3000/workspace/types',
    error: 'Something went wrong with fetching workspace types',
  },
};