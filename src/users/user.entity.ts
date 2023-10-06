import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "user@example.com", description: "Email" })
  @Column()
  email: string;

  @ApiProperty({ example: "John", description: "First name" })
  @Column()
  firstName: string;

  @ApiProperty({ example: "Doe", description: "Last name" })
  @Column()
  lastName: string;

  @ApiProperty({ example: "password", description: "Password" })
  @Column()
  password: string;
}
