import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../domain/User';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username });
  }

  async create(user: User) {
    const createdUser = new this.userModel(user);
    try {
      return await createdUser.save();
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) {
        return {
          error: true,
          message: 'Username already taken',
        };
      } else {
        return {
          error: true,
          message: 'User could not be created',
        };
      }
    }
  }
}
