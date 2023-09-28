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
    user.firstName = CreateUserSchema.firstName;
    user.lastName = CreateUserSchema.lastName;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
