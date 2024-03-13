import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../contants';

@Public()
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getUser() {
    return 'user';
  }

  @Post('signUp')
  async signUp(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string,
  ) {
    const data = await this.authService.signUp(
      email,
      name,
      password,
      confirmPassword,
    );

    return data;
  }

  @Post('signIn')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const data = await this.authService.signIn(email, password);
    return data;
  }
}
