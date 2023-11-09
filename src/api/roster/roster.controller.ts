import {
    Controller,
    Body,
    Post,
    HttpStatus,
    Request,
    Delete,
    Get,
    Param,
    BadRequestException,
  } from "@nestjs/common";
  import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags, 
    ApiOAuth2,
  } from "@nestjs/swagger";
import { Public } from "src/decorators/public.decorator";
  import { CreateRosterResponse, CreateRosterRequest, DeleteRosterRequest } from "../../schemas/roster/roster.schemas";
  import { RosterService } from "./roster.service";
  import { Roster } from "src/entities/roster/roster.entity";

@ApiOAuth2([], "Authentication")
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
      description: "Created a roster successfully"
    })
    // we need @Request() to get the user information
    // CreateRosterRequest is used because when we create the roster, we want the user to input the draftPosition as a parameter
    // Then we promise that what is returned is a CreateRosterResponse 
    createRoster(@Request() req, @Body() createRosterDTo: CreateRosterRequest): Promise<CreateRosterResponse>{
      // dummy roster of players
      const player1 = {name: "asdf", position: "QB"}
      const player2 = {name: "uu", position: "RB"}
      const player3 = {name: "qwer", position: "WR"}
      const players = [player1, player2, player3]
      
      // Using the create function to create a roster
      return this.rosterService.create(players, req.user.sub, createRosterDTo.draftPosition);
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

    @Delete()
    @ApiOperation({ summary: "Delete a roster" })
    @ApiResponse({
        status: 200,
        description: "Success",
    })
    // not done
    clear(@Param("ID") id: number): void {
      this.rosterService.remove(id);
    }

}