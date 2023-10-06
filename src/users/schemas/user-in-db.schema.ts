import { ApiProperty } from "@nestjs/swagger";

export class UserInDbSchema {
  @ApiProperty({ example: 1, description: "User id" })
  id: number;

  @ApiProperty({ example: "user@example.com", description: "Email" })
  email: string;

  @ApiProperty({ example: "John", description: "First name" })
  firstName: string;

  @ApiProperty({ example: "Doe", description: "Last name" })
  lastName: string;

  @ApiProperty({ example: "password", description: "Password" })
  password: string;
}
