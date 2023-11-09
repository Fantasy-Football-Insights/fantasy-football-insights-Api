import { Injectable, NotFoundException } from "@nestjs/common";
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

  async findOne(id: number): Promise<Roster> {
    const roster = this.RostersRepository.query(`SELECT * FROM roster WHERE id = ${id}`);
    if (!roster) {
      throw new NotFoundException();
    } 
    return roster;
  }

  async remove(id: number): Promise<Roster[]> {
    await this.RostersRepository.query(`DELETE FROM roster WHERE id = ${id}`);
    return this.RostersRepository.find();
  }
}
