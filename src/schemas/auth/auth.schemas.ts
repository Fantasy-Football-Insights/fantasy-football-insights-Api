import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// schema that is used when a user signs in
export class LogInResponse {
  @ApiProperty({ example: "string", description: "Access Token" })
  @IsString()
  access_token: string;
}
