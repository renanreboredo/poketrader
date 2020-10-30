import { Controller, Post, Body } from '@nestjs/common';
import { User } from '../domain/User';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  async create(
    /* @Param('id') id: string, */
    @Body() user: User,
  ): Promise<any> {
    const data: any = await this.userService.create(user);
    if (data && !data.error) {
      return {
        data,
        message: 'Success',
      };
    }
    return {
      data: [],
      message: data ? data.message : 'User could not be created',
    };
  }
}