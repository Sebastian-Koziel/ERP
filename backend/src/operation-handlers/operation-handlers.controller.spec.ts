import { Test, TestingModule } from '@nestjs/testing';
import { OperationHandlersController } from './operation-handlers.controller';

describe('OperationHandlersController', () => {
  let controller: OperationHandlersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperationHandlersController],
    }).compile();

    controller = module.get<OperationHandlersController>(OperationHandlersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
