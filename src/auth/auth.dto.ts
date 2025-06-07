import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The user email',
    example: 'john.doe@email.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The user password',
    example: '123456'
  })
  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    description: 'The user email',
    example: 'john.doe@email.com'
  })
  @IsEmail()
  email: string;


  @ApiProperty({
    description: 'The user password',
    example: '123456'
  })
  @IsString()
  @MinLength(6)
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'The access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  accessToken: string;

  @ApiProperty({
    description: 'The type of the token',
    example: 'Bearer'
  })
  tokenType: string;

  @ApiProperty({
    description: 'The expiration time of the token',
    example: '3600s'
  })
  expiresIn: string;
}