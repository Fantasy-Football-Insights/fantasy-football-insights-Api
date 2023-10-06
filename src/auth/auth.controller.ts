import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  Get,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UserSignInSchema } from "./schemas/auth.schemas";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@ApiBearerAuth()
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiOperation({ summary: "Login" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Login successful",
  })
  signIn(@Body() signInDto: UserSignInSchema) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  @ApiOperation({ summary: "Get profile" })
  getProfile(@Request() req) {
    return req.user;
  }
}
