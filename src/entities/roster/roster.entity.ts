import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

// defining how a roster should be stored in the database
@Entity()
export class Roster {
    // not sure how the data should be stored (array of player objects?)
}