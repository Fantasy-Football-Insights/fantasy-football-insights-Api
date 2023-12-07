import { Test, TestingModule } from '@nestjs/testing';
import { RosterController } from './roster.controller';
import { RosterService } from './roster.service';

describe('AuthController', () => {
  let controller: RosterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RosterController],
      providers: [{
        provide: RosterService,
        useValue: {
            findAll: jest.fn((x) => x)
        }
<<<<<<< HEAD
        }]
=======
      }]
>>>>>>> main
    }).compile();

    controller = module.get<RosterController>(RosterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

<<<<<<< HEAD
  describe('getAll', () => {
      it('should return array of rosters', async () => {
        await controller.findAll();
      })
=======
  describe('FindAll', () => {
    it('should return array of players', async () => {
        await controller.findAll();
    })
>>>>>>> main
  })
});
