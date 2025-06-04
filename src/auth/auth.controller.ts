import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private ormService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() authPayload: LoginDto) {
    return await this.ormService.validateUser(authPayload);
  }

  @Post('register')
  async register(@Body() registerPayload: RegisterDto) {
    return await this.ormService.register(registerPayload);
  }

  /*
  #TODO
  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {}

  @Patch('change-password')
  changePassword(@Body() dto: ChangePasswordDto) {}
  */
}
