import { Test, TestingModule } from '@nestjs/testing';
import { RosterService } from './roster.service';

describe('AuthController', () => {
  let controller: RosterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RosterService],
    }).compile();

    controller = module.get<RosterService>(RosterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
