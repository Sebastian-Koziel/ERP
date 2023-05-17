import { Test, TestingModule } from '@nestjs/testing';
import { OperationHandlersService } from './operation-handlers.service';

describe('OperationHandlersService', () => {
  let service: OperationHandlersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationHandlersService],
    }).compile();

    service = module.get<OperationHandlersService>(OperationHandlersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
