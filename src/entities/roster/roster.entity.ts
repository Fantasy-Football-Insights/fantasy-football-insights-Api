import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

// defining how a roster should be stored in the database
@Entity()
export class Roster {
    // attributes we should include are

    // id - so that each roster is unique
    @PrimaryGeneratedColumn()
    id: number;
    
    // Owner_id - this will be used to connect the roster to a user
    @ApiProperty({ example: 3, description: "Owner Id"})
    @Column({ nullable: false})
    Owner_ID: string;
    
    // players - array of player objects to hold players in the roster
    @ApiProperty({ example: "[Player1, Player2, Player3]", description: "Players"})
    @Column({ nullable: false})
    Players: [];
}