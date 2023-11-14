import { Module } from "@nestjs/common";
import { RosterService } from "./roster.service";
import { Roster } from "../../entities/roster/roster.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RosterController } from "./roster.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Roster])],
  providers: [RosterService],
  controllers: [RosterController],
  exports: [RosterService],
})
export class RosterModule {}
