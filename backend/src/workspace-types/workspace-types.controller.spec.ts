import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceTypesController } from './workspace-types.controller';

describe('WorkspaceTypesController', () => {
  let controller: WorkspaceTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspaceTypesController],
    }).compile();

    controller = module.get<WorkspaceTypesController>(WorkspaceTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
