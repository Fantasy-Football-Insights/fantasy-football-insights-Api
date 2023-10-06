import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserSchema } from "./schemas/create-user.schema";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  create(CreateUserSchema: CreateUserSchema): Promise<User> {
    const user = new User();
    user.email = CreateUserSchema.email;
    user.firstName = CreateUserSchema.firstName;
    user.lastName = CreateUserSchema.lastName;
    user.password = CreateUserSchema.password;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email: email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
