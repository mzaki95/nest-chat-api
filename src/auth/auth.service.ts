import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserContextDto } from 'src/user/dto/user-context.dto';
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
      const userContex = new UserContextDto(user.username);
      return this.signPayload(userContex);
    }
    console.log("not valid")

    // Either user not found or password is incorrect
    return null;
  }

  async signPayload(payload: UserContextDto): Promise<string> {
    return this.jwtService.sign({username: payload.username});
  }

  validatePassword(password: string, stored: string): boolean {
    console.log(password)
    console.log(stored)
    console.log(password === stored)
    return password === stored // TODO: proper hashing for the validated password
  }

  verifyToken(token: string): UserContextDto {
    return this.jwtService.verify(token);
  }
}
