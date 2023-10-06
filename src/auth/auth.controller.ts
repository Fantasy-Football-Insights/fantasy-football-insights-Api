import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  Get,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UserSignInSchema } from "./schemas/auth.schemas";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";

@ApiBearerAuth()
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("login")
  @ApiOperation({ summary: "Login" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Login successful",
  })
  signIn(@Body() signInDto: UserSignInSchema) {
    return this.authService.signIn(signInDto.email);
  }

  @Get("profile")
  @ApiOperation({ summary: "Get profile" })
  getProfile(@Request() req) {
    return req.user;
  }
}
