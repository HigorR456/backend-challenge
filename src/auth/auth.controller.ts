import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthResponseDto, LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'User login', description: 'Authenticate user and return JWT token' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'Access token', type: AuthResponseDto, example: AuthResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(@Body() authPayload: LoginDto) {
    return this.authService.validateUser(authPayload);
  }

  @Post('register')
  @HttpCode(201)
  @ApiOperation({ summary: 'User registration', description: 'Create user and return JWT token' })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({ description: 'Access token', type: AuthResponseDto, example: AuthResponseDto })
  @ApiBadRequestResponse({ description: 'Missing required fields' })
  @ApiConflictResponse({ description: 'Email is already in use'})
  async register(@Body() registerPayload: RegisterDto) {
    return this.authService.register(registerPayload);
  }

  /*
  #TODO
  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {}

  @Patch('change-password')
  changePassword(@Body() dto: ChangePasswordDto) {}
  */
}
