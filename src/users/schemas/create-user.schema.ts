import { ApiProperty } from "@nestjs/swagger";

export class CreateUserSchema {
  @ApiProperty({ example: "user@example.com", description: "Email" })
  email: string;

  @ApiProperty({ example: "John", description: "First name" })
  firstName: string;

  @ApiProperty({ example: "Doe", description: "Last name" })
  lastName: string;

  @ApiProperty({ example: "Password", description: "Password" })
  password: string;
}
