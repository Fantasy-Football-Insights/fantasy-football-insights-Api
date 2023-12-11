import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/users/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    find: jest.fn(() => {
      return [{
        id: 1,
        email: "user@example.com",
        firstName: "Xander",
        lastName: "Wynn"
      }, {
        id: 2,
        email: "test@example.com",
        firstName: "Max",
        lastName: "Lynn"
      }]
    }),
    findOneBy: jest.fn(({id: id}) => {
      if (id === 1) {
        return {
          id: 1,
          email: "user@example.com",
          firstName: "Xander",
          lastName: "Wynn"
        }
      }
      return undefined
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getRepositoryToken(User),
        useValue: mockUserRepository
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of users', async () => {
      const result = await service.findAll();

      expect(result).toEqual([{
        id: 1,
        email: "user@example.com",
        firstName: "Xander",
        lastName: "Wynn"
      }, {
        id: 2,
        email: "test@example.com",
        firstName: "Max",
        lastName: "Lynn"
      }])
    })
  })

  describe('findById', () => {
    it('should return user', async () => {
      const result = await service.findById(1);

      expect(result).toEqual({
        id: 1,
        email: "user@example.com",
        firstName: "Xander",
        lastName: "Wynn"
      })
    })

    it('should throw not found exception', async () => {
      try{
        await service.findById(3)
      } catch(e) {
        expect(e.message).toEqual("Not Found")
      }
    })
  })

});
