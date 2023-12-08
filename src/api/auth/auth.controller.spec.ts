import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import  { CreateUserSchema } from '../../schemas/users/users.schemas'
import  { UserSignInSchema } from '../../schemas/users/users.schemas'

describe('AuthController', () => {
  let controller: AuthController;

  const mockFunctions = {
    register: jest.fn(),
    doesUserExist: jest.fn(),
    signIn: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useValue: mockFunctions
      }]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should return a user', async () => {
      //arrange
      const user = {
        email: "test@test.com",
        firstName: "Bob",
        lastName: "Jones",
        password: "12345"
      } as CreateUserSchema

      jest.spyOn(mockFunctions, 'register').mockReturnValue(user);

      //act
      const result = await controller.register(user);

      //assert
      expect(mockFunctions.register).toBeCalled();
      expect(mockFunctions.register).toBeCalledWith(user);

      expect(result).toEqual(user);
    })
  })


  // Not finished
  describe('login', () => {
    it('should json object with access token', async () => {
      const user = {
        email: 'test@test.com',
        password: '12345'
      } as UserSignInSchema

      const access_token = {

      }

      //jest.spyOn(mockFunctions, 'signIn').mockReturnValue()
      
    })
  })
});
