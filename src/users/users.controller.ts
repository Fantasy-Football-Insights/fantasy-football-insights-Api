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
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() CreateUserSchema: CreateUserSchema): Promise<User> {
    return this.usersService.create(CreateUserSchema);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
