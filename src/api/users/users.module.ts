import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "../../entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
