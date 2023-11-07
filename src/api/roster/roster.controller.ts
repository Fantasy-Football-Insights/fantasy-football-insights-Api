import {
    Controller,
    Body,
    Post,
    HttpStatus,
    Request,
    Get,
    BadRequestException,
  } from "@nestjs/common";
  import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from "@nestjs/swagger";
import { Public } from "src/decorators/public.decorator";
  import { UserSignInSchema } from "../../schemas/users/user-signin.schema";
  import { RosterService } from "./roster.service";
  import { User } from "src/entities/users/user.entity";
  import { CreateUserSchema } from "src/schemas/users/create-user.schema";


@ApiTags('Roster')
@Controller('Roster')
export class RosterController {

    constuctor() {}

    @Get("All")
    @ApiOperation({summary: "Get All Rosters"})
    @ApiResponse({
        status: 200,
        description: "Success",
    })
    // boilerplate function
    getAll(): string {
        return 'This function should return the roster of a user'
    }

}