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

  async findOne(email: string): Promise<Roster> {
    return this.RostersRepository.findOneBy({ email: email });
  }

  async remove(id: string): Promise<void> {
    await this.RostersRepository.delete(id);
  }
}
