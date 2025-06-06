import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { GetProfileDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Body() data: GetProfileDto) {
    return await this.userService.getProfile(data)
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