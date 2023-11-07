import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Roster } from "../../entities/roster/roster.entity";

@Injectable()
export class RosterService {

    // still need to edit functions (copied from user.service)
  constructor(
    @InjectRepository(Roster)
    private readonly RostersRepository: Repository<Roster>
  ) {}

  async findAll(): Promise<Roster[]> {
    return this.RostersRepository.find();
  }
    // need to figure out how to insert into the data base
//   async insertOne(Player: object): Promise<Players[]>{
//     this.RostersRepository.Players.insertOne({player: Player});
//     return;
//   }

  async findOne(Owner_ID: string): Promise<Roster> {
    return this.RostersRepository.findOneBy({ Owner_ID: Owner_ID });
  }

  async remove(id: string): Promise<void> {
    await this.RostersRepository.delete(id);
  }
}
