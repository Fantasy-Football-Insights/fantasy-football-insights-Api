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
import { UserSignInSchema } from "./schemas/auth.schemas";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: UserSignInSchema) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
