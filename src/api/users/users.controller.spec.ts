import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserSchema } from "../../schemas/users/users.schemas"
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Controller, NotFoundException } from "@nestjs/common";
import { mock } from "node:test";

const mockUsersService = {
  findById: jest.fn(id => {
    if (id === 1) {
      return {
        id: 1,
        email: "user@example.com",
        password: "12345"
      }
    } else {
      throw new NotFoundException();
    }
  }),
  findAll: jest.fn(() => {
    return [{
      id: 1,
      email: "user@example.com",
      firstName: "Billy",
      lastName: "Joe"
    }]
  }),
  remove: jest.fn(),
}

describe("UsersController", () => {
  let controller: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService
        },
      ],
    }).compile();

    controller = app.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return user', async () => {
      const mockRequest = {
        user: {
          sub: 1
        }
      }

      const result = await controller.getProfile(mockRequest);

      expect(result).toEqual({
        id: 1,
        email: "user@example.com",
        password: "12345",
      })
    })

    it('should return not found exception', async () => {
      const mockRequest = {
        user: {
          sub: 2
        }
      }

      try {
        await controller.getProfile(mockRequest)
      } catch (e) {
        expect(e.message).toEqual('Not Found')
      }
    })
  })

  describe('findAll', () => {
    it('should return array of users', async () => {
      const result = await controller.findAll();

      expect(result).toEqual([{
        id: 1,
        email: "user@example.com",
        firstName: "Billy",
        lastName: "Joe"
      }])
    })
  })

  describe('findOne', () => {
    it('should return user', async () => {


      const result = await controller.findOne(1);

      expect(result).toEqual({
        id: 1,
        email: "user@example.com",
        password: "12345",
      })
    })

    it('should return not found exception', async () => {

      try {
        await controller.findOne(2)
      } catch (e) {
        expect(e.message).toEqual('Not Found')
      }
    })
  })


});
