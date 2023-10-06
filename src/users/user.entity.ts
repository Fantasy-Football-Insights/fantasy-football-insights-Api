import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "user@example.com", description: "Email" })
  @Column({ nullable: false })
  email: string;

  @ApiProperty({ example: "John", description: "First name" })
  @Column({ nullable: false })
  firstName: string;

  @ApiProperty({ example: "Doe", description: "Last name" })
  @Column({ nullable: false })
  lastName: string;

  @ApiProperty({ example: "password", description: "Password" })
  @Column({ nullable: false })
  password: string;
}
