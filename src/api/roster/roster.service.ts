import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { draftFantasyTeams } from "../../draftUtilities";
import { PlayerSchema } from "src/schemas/players/players.schemas";
import { CreateRosterRequest } from "src/schemas/roster/roster.schemas";
import { Repository } from "typeorm";
import { Roster } from "../../entities/roster/roster.entity";

@Injectable()
export class RosterService {
  constructor(
    @InjectRepository(Roster)
    private readonly RostersRepository: Repository<Roster>
  ) {}

  async findAll(): Promise<Roster[]> {
    return this.RostersRepository.find();
  }

  // creates a roster
  async create(
    allPlayers: PlayerSchema[],
    ownerId: number,
    createRosterDTO: CreateRosterRequest
  ) {
    const draft = await draftFantasyTeams(
      createRosterDTO.leagueSize,
      createRosterDTO.pickPreference
    );
    // waits for the roster to be saved to database and assigns it to roster variable
    const roster = await this.RostersRepository.save({
      ownerId,
      players: draft[createRosterDTO.draftPosition - 1].players,
      ...createRosterDTO,
    });
    // returns the roster
    return roster;
  }

  async findOne(uniqueID: number): Promise<Roster> {
    const roster = await this.RostersRepository.findOneBy({ id: uniqueID });
    if (!roster) {
      throw new NotFoundException();
    }
    return roster;
  }

  async remove(uniqueID: number): Promise<void> {
    if (this.findOne(uniqueID)){
      await this.RostersRepository.delete({ id: uniqueID });
    }
  }

  async findMyRosters(ownerId: number): Promise<Roster[]> {
    const rosters = await this.RostersRepository.query(
      `select * from roster where ownerId = ${ownerId}`
    );
    if (!rosters) {
      throw new NotFoundException();
    }
    return rosters;
  }
}
