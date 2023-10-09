import { IsString, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserSignInSchema {
  @ApiProperty({ example: "user@example.com", description: "Email" })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: "string", description: "password" })
  @IsString()
  readonly password: string;
}
