import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

// schema that is used when a user signs in
export class PlayerSchema {
  @ApiProperty({ example: "Christian McCaffrey", description: "Player Name" })
  @IsString()
  name: string;

  @ApiProperty({ example: "SF", description: "Player Team" })
  @IsString()
  team: string;

  @ApiProperty({ example: "RB", description: "Player Position" })
  @IsString()
  mainPos: string;

  @ApiProperty({
    example: ["RB", "RB/WR", "RB/WR/TE", "OP", "BE", "IR"],
    description: "Player All Positions",
  })
  @IsString()
  allPos: string[];

  @ApiProperty({ example: false, description: "Player Injury Status" })
  @IsBoolean()
  injured: boolean;

  @ApiProperty({ example: 24.8, description: "Player Current Average Points" })
  @IsNumber()
  curAvgPts: number;

  @ApiProperty({
    example: 19.6,
    description: "Player Season Average Projection",
  })
  @IsNumber()
  sznAvgProj: number;

  @ApiProperty({
    example: 99.95,
    description: "League Percentage Owned",
  })
  @IsNumber()
  pctOwned: number;

  @ApiProperty({
    example: 98.41,
    description: "League Percentage Started",
  })
  @IsNumber()
  pctStarted: number;

  @ApiProperty({
    example: false,
    description: "Player Draft Status",
  })
  @IsBoolean()
  drafted: boolean;
}
