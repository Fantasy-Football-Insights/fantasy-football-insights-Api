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

  // creates a roster
  async create(Players: any[], Owner_ID: number, draftPosition: number) {
    // waits for the roster to be saved to database and assigns it to roster variable
    const roster = await this.RostersRepository.save({
      Owner_ID,
      Players,
      draftPosition
    })
    // returns the roster
    return roster
  }

  async findOne(Owner_ID: number): Promise<Roster> {
    return this.RostersRepository.findOneBy({ Owner_ID: Owner_ID });
  }

  async remove(id: number): Promise<void> {
    await this.RostersRepository.query(`DELETE FROM roster WHERE id = ${id}`);
  }
}
