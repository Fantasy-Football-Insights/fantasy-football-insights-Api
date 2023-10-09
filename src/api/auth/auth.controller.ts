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
import { UserSignInSchema } from "../../schemas/user/user-signin.schema";
import { AuthService } from "./auth.service";
import { Public } from "../../decorators/public.decorator";
import { User } from "src/entities/user.entity";
import { CreateUserSchema } from "src/schemas/user/create-user.schema";

@ApiBearerAuth()
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: "Register User" })
  @ApiResponse({
    status: 200,
    description: "Login successful",
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
    status: HttpStatus.OK,
    description: "Login successful",
  })
  signIn(@Body() signInDto: UserSignInSchema) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get("profile")
  @ApiOperation({ summary: "Get profile" })
  getProfile(@Request() req) {
    return req.user;
  }
}
