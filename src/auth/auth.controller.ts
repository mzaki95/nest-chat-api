import { Controller, UseGuards, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: {username: string, password: string}): Promise<{ token: string }> {
    // Validate user credentials
    const token = await this.authService.validateUser(payload.username, payload.password);

    if (!token) {

    }


    return { token };
  }

  @Post('protected')
  @UseGuards(JwtAuthGuard)
  protectedRoute() {
    // This route is protected and can only be accessed with a valid JWT for testing
    return { message: 'You have access to this protected route!' };
  }
}
