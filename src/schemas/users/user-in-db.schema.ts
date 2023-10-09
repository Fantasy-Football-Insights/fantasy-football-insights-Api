import { ApiProperty } from "@nestjs/swagger";

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
