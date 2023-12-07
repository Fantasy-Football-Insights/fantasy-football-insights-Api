import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

// schema that is used when a user signs in
export class CreateRosterResponse {
  @ApiProperty({ example: 1, description: "ID" })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 1, description: "Owner ID" })
  @IsNumber()
  ownerId: number;

  @ApiProperty({ example: 1, description: "Draft Position" })
  @IsNumber()
  draftPosition: number;

  @ApiProperty({ example: "String", description: "League Name" })
  @IsString()
  leagueName: string;

  @ApiProperty({ example: "String", description: "Team Name" })
  @IsString()
  teamName: string;

  @ApiProperty({ example: 10, description: "League Size" })
  @IsNumber()
  leagueSize: number;

  @ApiProperty({ example: 10, description: "League Size" })
  @IsNumber()
  players: JSON;
}

export class CreateRosterRequest {
  @ApiProperty({ example: 1, description: "Draft Position" })
  @IsNumber()
  draftPosition: number;

  @ApiProperty({ example: "String", description: "League Name" })
  @IsString()
  leagueName: string;

  @ApiProperty({ example: "String", description: "Team Name" })
  @IsString()
  teamName: string;

  @ApiProperty({ example: 10, description: "League Size" })
  @IsNumber()
  leagueSize: number;
}

export class DeleteRosterRequest {
  @ApiProperty({ example: 1, description: "ID" })
  @IsNumber()
  id: number;
}
