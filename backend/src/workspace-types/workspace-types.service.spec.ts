import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceTypesService } from './workspace-types.service';

describe('WorkspaceTypesService', () => {
  let service: WorkspaceTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspaceTypesService],
    }).compile();

    service = module.get<WorkspaceTypesService>(WorkspaceTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
