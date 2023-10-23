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
import { AuthService } from "./auth.service";
import { Public } from "../../decorators/public.decorator";
import { User } from "src/entities/users/user.entity";
import { LogInResponse } from "src/schemas/auth/auth.schemas";
import {
  UserProfileSchema,
  CreateUserSchema,
  UserInDbSchema,
  UserSignInSchema,
} from "src/schemas/users/users.schemas";

@ApiTags("Authentication")
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("register")
  @ApiOperation({ summary: "Register User" })
  @ApiResponse({
    status: 200,
    type: UserProfileSchema,
  })
  @ApiResponse({
    status: 400,
    description: "User already exists",
  })
  async register(@Body() CreateUserSchema: CreateUserSchema): Promise<User> {
    if (await this.authService.doesUserExist(CreateUserSchema.email)) {
      throw new BadRequestException("User already exists");
    }
    return await this.authService.register(CreateUserSchema);
  }

  @Public()
  @Post("login")
  @ApiOperation({ summary: "Login" })
  @ApiResponse({
    status: 200,
    description: "Login successful",
    type: LogInResponse,
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  signIn(@Body() signInDto: UserSignInSchema) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
