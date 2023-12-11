import { Test, TestingModule } from '@nestjs/testing';
import { RosterController } from './roster.controller';
import { RosterService } from './roster.service';
import { CreateRosterRequest, RosterSchema } from '../../schemas/roster/roster.schemas';

/*

  Pretty sure this file is not done correctly, but all other unit test files are

*/

describe('RosterController', () => {
  let controller: RosterController;

  const mockFunctions = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findMyRosters: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
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

  describe('findAll', () => {
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


  describe('findMyRosters', () => {
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

      const mockRequest = {
        user: {
          sub: 1
        }
      }

      const rosters = [roster];
      jest.spyOn(mockFunctions, 'findMyRosters').mockReturnValue(rosters);

      const result = await controller.findMy(mockRequest);

      expect(result).toEqual(rosters);
      expect(mockFunctions.findMyRosters).toBeCalledWith(mockRequest.user.sub);
    })
  })


  describe('findOne', () => {
    it('should return one roster', async () => {
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

      jest.spyOn(mockFunctions, 'findOne').mockReturnValue(roster);

      const result = await controller.findOne(1);

      expect(result).toEqual(roster);
      expect(mockFunctions.findOne).toBeCalled();
    })
  })


  describe('create', () => {
    it('should return a roster', async () => {

      const allPlayers = [
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
        {
          name: "Tyreek Hill",
          team: "MIA",
          mainPos: "WR",
          allPos: ["RB/WR", "WR", "WR/TE", "RB/WR/TE", "OP", "BE", "IR"],
          injured: false,
          curAvgPts: 25.48,
          sznAvgProj: 19.58,
          pctOwned: 99.94,
          pctStarted: 97.21,
          drafted: false,
        },
        {
          name: "Travis Kelce",
          team: "KC",
          mainPos: "TE",
          allPos: ["WR/TE", "TE", "RB/WR/TE", "OP", "BE", "IR"],
          injured: false,
          curAvgPts: 17.12,
          sznAvgProj: 18.61,
          pctOwned: 99.93,
          pctStarted: 97.21,
          drafted: false,
        },
      ]

      const roster = {
        teamName: 'Dogs',
        leagueSize: 5,
        draftPosition: 1,
        pickPreference: "QB"
      } as CreateRosterRequest;

      const mockRequest = {
        user: {
          sub: 1
        }
      }

      jest.spyOn(mockFunctions, 'create').mockReturnValue(roster);

      //act
      const result = await controller.createRoster(mockRequest, roster);

      //assert
      expect(mockFunctions.create).toBeCalled();
      expect(mockFunctions.create).toBeCalledWith(allPlayers, mockRequest.user.sub, roster);

      expect(result).toEqual(roster);
    })
  })

  describe('delete', () => {
    it('should return void', async () => {
      jest.spyOn(mockFunctions, 'remove');

      const result = await controller.del(1);

      expect(mockFunctions.remove).toBeCalled();
    })
  })

});
