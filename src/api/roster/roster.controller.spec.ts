import { Test, TestingModule } from '@nestjs/testing';
import { RosterController } from './roster.controller';
import { RosterService } from './roster.service';

describe('RosterController', () => {
  let controller: RosterController;

  const mockFunctions = {
    findAll: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RosterController],
      providers: [{
        provide: RosterService,
        useValue: mockFunctions
      }]
    }).compile();

    controller = module.get<RosterController>(RosterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('FindAll', () => {
    it('should return array of rosters', async () => {
        const roster = {
          id: 1,
          ownerId: 1,
          draftPosition: 1,
          leagueName: 'Test',
          teamName: 'Cleveland Browns',
          leagueSize: 5,
          players: [
            {
              name: "Christian McCaffrey",
              team: "SF",
              mainPos: "RB",
              allPos: ["RB", "RB/WR", "RB/WR/TE", "OP", "BE", "IR"],
              injured: false,
              curAvgPts: 24.8,
              sznAvgProj: 19.6,
              pctOwned: 99.95,
              pctStarted: 98.41,
              drafted: false,
            },
          ]
        }

        const rosters = [roster];
        jest.spyOn(mockFunctions, 'findAll').mockReturnValue(rosters);

        const result = await controller.findAll();

        expect(result).toEqual(rosters);
        expect(mockFunctions.findAll).toBeCalled();
    })
  })

  describe('create', () => {
    it('should return a roster', async () => {
      
    })
  })

});
