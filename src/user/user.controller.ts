import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile() {
    return await this.userService
  }

  /*
  #TODO
  @UseGuards(AuthGuard('jwt'))
  @Delete('me')
  removeProfile() {}

  @UseGuards(AuthGuard('jwt'))
  @Patch('me')
  updateProfile() {}
  */
}