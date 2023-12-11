import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserRepository = {
    register: jest.fn(),
    doesUserExist: jest.fn(),
    signIn: jest.fn()
  }

  const mockUserService = {

  }

  const mockJwtService = {

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {
        provide: getRepositoryToken(User),
        useValue: mockUserRepository
      }, {
        provide: UsersService,
        useValue: mockUserService
      }, {
        provide: JwtService,
        useValue: mockJwtService
      }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


});
