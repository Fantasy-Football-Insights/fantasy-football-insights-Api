import { Test, TestingModule } from '@nestjs/testing';
import { RosterService } from './roster.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Roster } from '../../entities/roster/roster.entity';
import { CreateRosterRequest } from 'src/schemas/roster/roster.schemas';

describe('AuthService', () => {
  let service: RosterService;

  const mockRosterRepository = {
    find: jest.fn(() => {
      return [{}];
    }),
    save: jest.fn(dto => {
      return {
        id: 1,
        ownerId: 1,
        players: [],
        leagueSize: 4,
        teamName: 'SF',
        draftPosition: 1,
        pickPreference: "RB",
      }
    }),
    findOneBy: jest.fn((id) => {
      if (id === 2){
        return {};
      } else {
      return {
        id: 1,
        ownerId: 1,
        players: [],
        leagueName: 'Karen',
        leagueSize: 4,
        teamName: 'SF',
        draftPosition: 1
      };
    }}),
    query: jest.fn((id) => {
      if (id === 2){
        return [{}];
      }
      return [{
        id: 1,
        ownerId: 1,
        players: [],
        leagueName: 'Karen',
        leagueSize: 4,
        teamName: 'SF',
        draftPosition: 1
      }]
    }),
    delete: jest.fn(() => {
      return 1;
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RosterService, {
        provide: getRepositoryToken(Roster),
        useValue: mockRosterRepository
      }],
    }).compile();

    service = module.get<RosterService>(RosterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of rosters', async () => {
      const result = await service.findAll();

      expect(result).toEqual([{}]);
    })
  })

  describe('create', () => {
    it('should return roster object', async () => {
      const players = [];
      const ownerId = 1;
      const dto = {
        teamName: 'SF',
        leagueSize: 4,
        draftPosition: 1,
        pickPreference: "RB"
      } as CreateRosterRequest;

      const expected = {
        id: 1,
        ownerId: 1,
        players: players,
        ...dto
      }

      const result = await service.create(players, ownerId, dto)

      expect(result).toEqual(expected);
    })
  })

  describe('findOne', () => {
    it('should return a roster', async () => {
      const dto = {id: 1,
        ownerId: 1,
        players: [],
        leagueName: 'Karen',
        leagueSize: 4,
        teamName: 'SF',
        draftPosition: 1}

      const result = await service.findOne(1);

      expect(result).toEqual(dto);
    })

    it('should return empty object', async () => {
      await service.findOne(2);

      expect(mockRosterRepository.findOneBy(2)).toEqual({});
    })
  })

  describe('findMyRosters', () => {
    it('should return array of rosters', async () => {

      const dto = {
        id: 1,
        ownerId: 1,
        players: [],
        leagueName: 'Karen',
        leagueSize: 4,
        teamName: 'SF',
        draftPosition: 1
      };

      await service.findMyRosters(1);

      expect(mockRosterRepository.query(1)).toEqual([dto]);
    })

    it('should return empty object', async () => {
      await service.findMyRosters(2);

      expect(mockRosterRepository.query(2)).toEqual([{}])
    })
  })

  describe('remove', () => {
    it('should call delete', async () => {
      await service.remove(1);

      expect(mockRosterRepository.delete()).toEqual(1);
    })

    it('should not call delete', async () => {

      await service.remove(2);

      expect(mockRosterRepository.findOneBy(2)).toEqual({});
    })
  })

});
