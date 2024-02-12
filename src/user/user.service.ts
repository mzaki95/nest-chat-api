import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') // TODO: put into constant
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const options = { where: { username } };
    return this.userRepository.findOne(options);
  }

  async register(userData: { username: string; password: string }): Promise<User> {
    const existingUser = await this.findByUsername(userData.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // const hashedPassword = 'hashPasswordFunctionHere';  // TODO: proper hashing
    const hashedPassword = userData.password;

    const newUser = await this.create({
      username: userData.username,
      password: hashedPassword,
    });

    return newUser;
  }
}