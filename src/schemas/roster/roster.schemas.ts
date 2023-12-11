import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { PlayerSchema } from "../players/players.schemas";

// schema that is used when a user signs in
export class RosterSchema {
  @ApiProperty({ example: 1, description: "ID" })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 1, description: "Owner ID" })
  @IsNumber()
  ownerId: number;

  @ApiProperty({ example: 1, description: "Draft Position" })
  @IsNumber()
  draftPosition: number;

  @ApiProperty({ example: "String", description: "Team Name" })
  @IsString()
  teamName: string;

  @ApiProperty({ example: 10, description: "League Size" })
  @IsNumber()
  leagueSize: number;

  @ApiProperty({
    example: [
      {
        name: "Christian McCaffrey",
        team: "SF",
        mainPos: "RB",
        allPos: ["RB", "RB/WR", "RB/WR/TE", "OP", "BE", "IR"],
        injured: false,
        curAvgPts: 24.8,
        sznAvgProj: 19.6,
        pctOwned: 99.95,
        pctStarted: 98.41,
        drafted: false,
      },
    ],
    description: "League Size",
  })
  players: PlayerSchema[];
}

export class CreateRosterRequest {
  @ApiProperty({ example: "String", description: "Team Name" })
  @IsString()
  teamName: string;

  @ApiProperty({ example: 10, description: "League Size" })
  @IsNumber()
  leagueSize: number;

  @ApiProperty({ example: 1, description: "Draft Position" })
  @IsNumber()
  draftPosition: number;

  @ApiProperty({ example: "RB", description: "First Pick Preference" })
  @IsString()
  pickPreference: string;
}

export class DeleteRosterRequest {
  @ApiProperty({ example: 1, description: "ID" })
  @IsNumber()
  id: number;
}
