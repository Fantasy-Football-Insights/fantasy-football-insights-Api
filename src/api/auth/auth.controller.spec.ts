import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import  { CreateUserSchema } from '../../schemas/users/users.schemas'
import  { UserSignInSchema } from '../../schemas/users/users.schemas'
import { Oauth2SignInSchema } from '../../schemas/users/users.schemas';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn(CreateUserSchema => {
      return {
        ...CreateUserSchema
      }
    }),
    doesUserExist: jest.fn(email => {
      if (email === 'user@example.com') {
        return true;
      }
      return false;
    }),
    signIn: jest.fn((email, password) => {
      if (email === "None") {
        return 'Not Found'
      } else if (email === "Not Authorized") {
        return email
      }
      return 'access token';
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useValue: mockAuthService
      }]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should return user', async () => {
      const user = {
        email: 'test@example.com',
        firstName: 'Bob',
        lastName: 'Jones',
        password: '12345',
      } as CreateUserSchema;

      const result = await controller.register(user)

      expect(result).toEqual(user);
    })

    it('should return exception with message "user already exists"', async () => {
      const user = {
        email: 'user@example.com',
        firstName: 'test',
        lastName: 'tset',
        password: '54321',
      } as CreateUserSchema;
      try{
        await controller.register(user)
      } catch(e) {
        expect(e.message).toEqual('User already exists');
      }
    })
  })

  describe('login', () => {
    it('should return Not Found', async () => {

      const user = {
        email: "None",
        password: 'password',
      } as UserSignInSchema;

      const result = await controller.login(user);

      expect(result).toEqual('Not Found')
    })

    it('should return Not Authorized', async () => {
      const user = {
        email: "Not Authorized",
        password: 'password',
      } as UserSignInSchema;
      const result = await controller.login(user);
  
      expect(result).toEqual('Not Authorized')
    })
  
    it('should return access token', async () => {
      const user = {
        email: "example@example.com",
        password: 'password',
      } as UserSignInSchema;
      const result = await controller.login(user);
  
      expect(result).toEqual('access token')
    })
  })

  describe('signInDocs', () => {
    it('should return Not Found', async () => {

      const user = {
        username: "None",
        password: 'password',
      } as Oauth2SignInSchema;

      const result = await controller.signInDocs(user);

      expect(result).toEqual('Not Found')
    })

    it('should return Not Authorized', async () => {
      const user = {
        username: "Not Authorized",
        password: 'password',
      } as Oauth2SignInSchema;
      const result = await controller.signInDocs(user);
  
      expect(result).toEqual('Not Authorized')
    })
  
    it('should return access token', async () => {
      const user = {
        username: "example@example.com",
        password: 'password',
      } as Oauth2SignInSchema;
      const result = await controller.signInDocs(user);
  
      expect(result).toEqual('access token')
    })
  })

});
