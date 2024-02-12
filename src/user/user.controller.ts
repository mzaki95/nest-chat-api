import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userData: { username: string; password: string }) {
    // TODO: username and password validation
    // TODO: proper error response handling duplicated username
    return this.userService.register(userData);
  }
}
