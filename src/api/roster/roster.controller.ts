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
  import { Roster } from "src/entities/roster/roster.entity";
  import { CreateUserSchema } from "src/schemas/users/create-user.schema";


@ApiTags('Roster')
@Controller('Roster')
export class RosterController {
    constructor(private readonly rosterService: RosterService) {}

    @Get("All")
    @ApiOperation({ summary: "Get all rosters" })
    @ApiResponse({
        status: 200,
        description: "Success",
    })
    // This should return all rosters in the database
    findAll(): Promise<Roster[]> {
        return this.rosterService.findAll()
    }

    @Post()
    @ApiOperation({ summary: "Create a roster "})
    @ApiResponse({
      status: 200,
      dscription: "Created a roster successfully"
    })
    createRoster(): {

    }

    // @Get()
    // @ApiOperation({ summary: "Get one roster" })
    // @ApiResponse({
    //     status: 200,
    //     description: "Success"
    // })
    // // still need to finish
    // findOne(@Body() owner_id: ): Promise<Roster> {
    //     return this.rosterService.findOne()
    // }

    // @Delete()
    // @ApiOperation({ summary: "Delete all rosters" })
    // @ApiResponse({
    //     status: 200,
    //     description: "Success",
    // })
    // // not done
    // clear(): void {

    // }

}