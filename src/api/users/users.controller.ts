import { Body, Controller, Delete, Get, Param, Request } from "@nestjs/common";
import { CreateUserSchema } from "../../schemas/users/create-user.schema";
import { UserInDbSchema } from "../../schemas/users/user-in-db.schema";
import { User } from "../../entities/users/user.entity";
import { UsersService } from "./users.service";
import { Public } from "src/decorators/public.decorator";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiOAuth2,
} from "@nestjs/swagger";

@ApiOAuth2([], "Authentication")
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("all")
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "Login successful",
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get()
  @ApiOperation({ summary: "Get single user" })
  @ApiResponse({
    status: 200,
    description: "Login successful",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
  })
  findOne(@Param("id") id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @Get("profile")
  @ApiOperation({ summary: "Get profile" })
  getProfile(@Request() req) {
    return req.user;
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete User" })
  @ApiResponse({
    status: 200,
    description: "Login successful",
  })
  remove(@Param("id") id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
