import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userService.findUser(email);

    if (!user || !user.comparePasswords(password, user.password)) {
      throw new NotFoundException('Email or password is incorrect');
    }

    const token = await this.jwtService.signAsync({ id: user._id });

    return { token };
  }

  async signUp(
    email: string,
    name: string,
    pass: string,
    confirmPass: string,
  ): Promise<{ token: string }> {
    const user = await this.userService.addUser(email, name, pass, confirmPass);
    const token = await this.jwtService.signAsync({ id: user._id });

    return { token };
  }
}
