import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserSchema } from 'src/schemas/users/users.schemas';
import { hashPassword } from '../../core/security';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserRepository = {
    save: jest.fn((dto) => {
      return {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: hashPassword(dto.password),
      }
    }),
  }
  
  const mockUserService = {
    findOne: jest.fn(email => {
      if (email === "user@example.com"){
        return {
          id: 1,
          email: email,
          password: '12345',
        }
      } else {
        return undefined
      }
    })
  }

  const mockJwtService = {
    signAsync: jest.fn(() => {
      return "Access Token";
    })
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

  describe('register', () => {
    it('should return user', async () => {
      const user = {
        email: 'test@example.com',
        firstName: 'Bob',
        lastName: 'Jones',
        password: '12345',
      } as CreateUserSchema;

      const result = await service.register(user)

      expect(result).toEqual({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: expect.any(String),
      });
    })
  })

  describe('signIn', () => {
    it('should throw not found exception', async () => {
      const user = {
        email: "None@gmail.com",
        password: '1234'
      };
      try {
        await service.signIn(user.email, user.password);
      } catch(e) {
        expect(e.message).toEqual("Not Found")
      }
    })

    it('should throw unauthorized exception', async () => {
    const user = {
      email: 'user@example.com',
      password: '12345'
    }

    try {
      await service.signIn(user.email, 'user.password')
    } catch(e) {
      expect(e.message).toEqual("Unauthorized")
    }
    })

    it('should return access token', async () => {
      const user = {
        email: 'user@example.com',
        password: '12345',
      }

      const result = await service.signIn(user.email, user.password);

      expect(result).toEqual({access_token: 'Access Token'})
    })
  })

  describe('doesUserExist', () => {
    it('should return true', async () => {
      const user = {
        email: 'user@example.com',
        password: '12345',
      }

      const result = await service.doesUserExist(user.email);

      expect(result).toEqual(true)
    })
    it('should return false', async () => {
      const user = {
        email: 'None@gmail.com',
        password: '12345',
      }

      const result = await service.doesUserExist(user.email);

      expect(result).toEqual(false)
    })
  })

});
