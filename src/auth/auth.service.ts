import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<string> {
    const user = await this.userService.findByUsername(username);

    if (user && this.validatePassword(password, user.password)) {
      // Password is valid, return the user
      return this.signPayload({username: user.username});
    }
    console.log("not valid")

    // Either user not found or password is incorrect
    return null;
  }

  validatePassword(password: string, stored: string): boolean {
    console.log(password)
    console.log(stored)
    console.log(password === stored)
    return password === stored // TODO: proper hashing for the validated password
  }

  async signPayload(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
