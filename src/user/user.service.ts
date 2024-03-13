import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findUser(email: string): Promise<User> {
    {
      const user = await this.userModel.findOne({ email }).select('+password');
      return user;
    }
  }

  async addUser(
    email: string,
    name: string,
    password: string,
    confirmPassword: string,
  ): Promise<User> {
    let user;

    try {
      user = await this.userModel.create({
        email,
        name,
        password,
        confirmPassword,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return user;
  }
}
