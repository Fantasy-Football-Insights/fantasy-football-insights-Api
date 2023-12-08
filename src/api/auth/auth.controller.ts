import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "../../entities/users/user.entity";
import { LogInResponse } from "../../schemas/auth/auth.schemas";
import {
  CreateUserSchema,
  Oauth2SignInSchema,
  UserProfileSchema,
  UserSignInSchema,
} from "../../schemas/users/users.schemas";
import { Public } from "../../decorators/public.decorator";
import { AuthService } from "./auth.service";

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
    console.log(CreateUserSchema);
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

  @Public()
  @Post("oauth2/login")
  @ApiOperation({ summary: "Login to docs" })
  @ApiResponse({
    status: 200,
    description: "Login successful",
    type: LogInResponse,
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  signInDocs(@Body() signInDto: Oauth2SignInSchema) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
