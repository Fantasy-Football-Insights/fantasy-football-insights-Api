import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersService } from "../../api/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { comparePassword } from "../../core/security";
import { User } from "../../entities/users/user.entity";
import { CreateUserSchema } from "../../schemas/users/users.schemas";
import { hashPassword } from "../../core/security";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(createUserIn: CreateUserSchema): Promise<User> {
    const { email, firstName, lastName, password } = createUserIn;
    const hashedPassword = hashPassword(password);

    const user = await this.usersRepository.save({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    return user;
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException();
    }
    if (comparePassword(password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async doesUserExist(email: string): Promise<boolean> {
    const user = await this.usersService.findOne(email);
    console.log(user)
    if (user) {
      return true;
    }
    return false;
  }
}
