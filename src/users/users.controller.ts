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

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() CreateUserSchema: CreateUserSchema): Promise<User> {
    return this.usersService.create(CreateUserSchema);
  }

  @Public()
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get()
  findOne(@Body() findOneDto: UserInDbSchema): Promise<User> {
    return this.usersService.findOne(findOneDto.email);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
