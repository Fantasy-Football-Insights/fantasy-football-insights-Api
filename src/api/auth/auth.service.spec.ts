import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateUserSchema } from '../../schemas/users/users.schemas';

describe('AuthService', () => {
  let service: AuthService;

  const mockFunctions = {
    register: jest.fn(),
    doesUserExist: jest.fn(),
    signIn: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
      const result = await service.register(user);

      //assert
      expect(mockFunctions.register).toBeCalled();
      expect(mockFunctions.register).toBeCalledWith(user);

      expect(result).toEqual(user);
    })
  })

});
