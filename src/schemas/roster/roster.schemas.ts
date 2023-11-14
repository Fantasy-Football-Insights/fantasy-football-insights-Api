import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// schema that is used when a user signs in
export class CreateRosterResponse {
  @ApiProperty({ example: 1, description: "ID" })
  @IsNumber()
  id: number;
}

export class CreateRosterRequest {
  @ApiProperty({ example: 1, description: "Draft Position" })
  @IsNumber()
  draftPosition: number;
}

export class DeleteRosterRequest {
  @ApiProperty({ example: 1, description: "ID"})
  @IsNumber()
  id: number;
}

