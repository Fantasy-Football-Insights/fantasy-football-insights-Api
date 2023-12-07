import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// defining how a roster should be stored in the database
@Entity()
export class Roster {
  // id - so that each roster is unique
  @PrimaryGeneratedColumn()
  id: number;

  // Owner_id - this will be used to connect the roster to a user
  @ApiProperty({ example: 3, description: "Owner Id" })
  @Column({ nullable: false })
  ownerId: number;

  // League Name - this will be used to display the league name
  @ApiProperty({ example: "String", description: "League Name" })
  @Column({ nullable: false })
  leagueName: string;

  // Team Name - this will be used to display the team name
  @ApiProperty({ example: "String", description: "Team Name" })
  @Column({ nullable: false })
  teamName: string;

  // League Size - this will be used to display the size of the user's league
  @ApiProperty({ example: 10, description: "League Size" })
  @Column({ nullable: false })
  leagueSize: number;

  // draftPosition - this will be the position in the draft when the user picks
  @ApiProperty({ example: 2, description: "Draft Position" })
  @Column({ nullable: false })
  draftPosition: number;

  // players - array of player objects to hold players in the roster
  @ApiProperty({
    example: "[Player1, Player2, Player3]",
    description: "Players",
  })
  @Column("json", { nullable: false })
  players: any[];
}
