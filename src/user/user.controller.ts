import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserEntity } from 'src/shared/entity';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserResponseDto } from './user.dto';
import { User } from 'src/shared/decorators';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get authenticated user profile', description: 'Retrieve profile information of the authenticated user' })
  @ApiBearerAuth('accessToken')
  @ApiOkResponse({ description: "User profile information", type: UserResponseDto, example: UserResponseDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async getProfile(
      @User() user: UserEntity
  ) {
    return this.userService.getProfile(user)
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