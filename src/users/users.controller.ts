import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from "@nestjs/common";
import { CreateUserSchema } from "./schemas/create-user.schema";
import { UserInDbSchema } from "./schemas/user-in-db.schema";
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import { Public } from "src/auth/decorators/public.decorator";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags("users")
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
  findOne(@Body() findOneDto: UserInDbSchema): Promise<User> {
    return this.usersService.findOne(findOneDto.email);
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
