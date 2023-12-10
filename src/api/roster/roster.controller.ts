import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from "@nestjs/common";
import { ApiOAuth2, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roster } from "../../entities/roster/roster.entity";
import {
  CreateRosterRequest,
  RosterSchema,
} from "../../schemas/roster/roster.schemas";
import { RosterService } from "./roster.service";

@ApiOAuth2([], "Authentication")
@ApiTags("Roster")
@Controller("rosters")
export class RosterController {
  constructor(private readonly rosterService: RosterService) {}

  @Get("")
  @ApiOperation({ summary: "Get all rosters" })
  @ApiResponse({
    status: 200,
    description: "Success",
    type: [RosterSchema],
  })
  // This should return all rosters in the database
  findAll(): Promise<Roster[]> {
    return this.rosterService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "Create a roster" })
  @ApiResponse({
    status: 200,
    description: "Created a roster successfully",
    type: RosterSchema,
  })
  // we need @Request() to get the user information
  // CreateRosterRequest is used because when we create the roster, we want the user to input the draftPosition as a parameter
  // Then we promise that what is returned is a CreateRosterResponse
  create(
    @Request() req,
    @Body() createRosterDTO: CreateRosterRequest
  ): Promise<Roster> {
    // dummy roster of players
    const players = [
      {
        name: "Christian McCaffrey",
        team: "SF",
        mainPos: "RB",
        allPos: ["RB", "RB/WR", "RB/WR/TE", "OP", "BE", "IR"],
        injured: false,
        curAvgPts: 24.8,
        sznAvgProj: 19.6,
        pctOwned: 99.95,
        pctStarted: 98.41,
        drafted: false,
      },
      {
        name: "Tyreek Hill",
        team: "MIA",
        mainPos: "WR",
        allPos: ["RB/WR", "WR", "WR/TE", "RB/WR/TE", "OP", "BE", "IR"],
        injured: false,
        curAvgPts: 25.48,
        sznAvgProj: 19.58,
        pctOwned: 99.94,
        pctStarted: 97.21,
        drafted: false,
      },
      {
        name: "Travis Kelce",
        team: "KC",
        mainPos: "TE",
        allPos: ["WR/TE", "TE", "RB/WR/TE", "OP", "BE", "IR"],
        injured: false,
        curAvgPts: 17.12,
        sznAvgProj: 18.61,
        pctOwned: 99.93,
        pctStarted: 97.21,
        drafted: false,
      },
    ];

    // Using the create function to create a roster
    return this.rosterService.create(players, req.user.sub, createRosterDTO);
  }

  @Get("my")
  @ApiOperation({ summary: "Get my rosters" })
  @ApiResponse({
    status: 200,
    description: "Success",
    type: [RosterSchema],
  })
  @ApiResponse({
    status: 404,
    description: "No rosters found",
  })
  findMyRosters(@Request() req): Promise<Roster[]> {
    return this.rosterService.findMyRosters(req.user.sub);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one roster" })
  @ApiResponse({
    status: 200,
    description: "Success",
    type: RosterSchema,
  })
  @ApiResponse({
    status: 404,
    description: "Roster not found",
  })
  // Param function allows us to get an input from the user and use it
  findOne(@Param("id") id: number): Promise<Roster> {
    return this.rosterService.findOne(id);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a roster" })
  @ApiResponse({
    status: 200,
    description: "Success",
  })
  @ApiResponse({
    status: 404,
    description: "Roster not found",
  })
  // takes an ID that the user inputs and removes that roster
  del(@Param("id") id: number): Promise<void> {
    return this.rosterService.remove(id);
  }
}
