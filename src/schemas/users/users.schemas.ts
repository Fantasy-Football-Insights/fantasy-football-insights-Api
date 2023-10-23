import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

// schema that is used when a user is pulled from the database
export class UserProfileSchema {
  @ApiProperty({ example: 1, description: "User id" })
  id: number;

  @ApiProperty({ example: "user@example.com", description: "Email" })
  email: string;

  @ApiProperty({ example: "John", description: "First name" })
  firstName: string;

  @ApiProperty({ example: "Doe", description: "Last name" })
  lastName: string;
}

// schema that is used when a user signs in
export class UserSignInSchema {
  @ApiProperty({ example: "user@example.com", description: "Email" })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: "string", description: "password" })
  @IsString()
  readonly password: string;
}

// schema that is used when a user is pulled from the database
export class UserInDbSchema {
  @ApiProperty({ example: 1, description: "User id" })
  id: number;

  @ApiProperty({ example: "user@example.com", description: "Email" })
  email: string;

  @ApiProperty({ example: "John", description: "First name" })
  firstName: string;

  @ApiProperty({ example: "Doe", description: "Last name" })
  lastName: string;

  @ApiProperty({ example: "string", description: "Password" })
  password: string;
}

// Schema that is used to create a user
export class CreateUserSchema {
  @ApiProperty({ example: "user@example.com", description: "Email" })
  email: string;

  @ApiProperty({ example: "John", description: "First name" })
  firstName: string;

  @ApiProperty({ example: "Doe", description: "Last name" })
  lastName: string;

  @ApiProperty({ example: "string", description: "Password" })
  password: string;
}
