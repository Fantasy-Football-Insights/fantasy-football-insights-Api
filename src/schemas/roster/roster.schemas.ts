import { IsNumber} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


const player1 = {name: "asdf", position: "QB"}
const player2 = {name: "uu", position: "RB"}
const player3 = {name: "qwer", position: "WR"}
const players = [player1, player2, player3]

// schema that is used when a user signs in
export class CreateRosterResponse {
  @ApiProperty({ example: 1, description: "ID" })
  @IsNumber()
  id: number;
}

export class CreateRosterRequest {
  @ApiProperty({ example: 1, description: "Draft Position" })
  draftPosition: number;
  @ApiProperty({ example: players, description: "players" })
  players: Array<JSON>;
}

export class DeleteRosterRequest {
  @ApiProperty({ example: 1, description: "ID"})
  @IsNumber()
  id: number;
}