import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsDate } from 'class-validator';

export class UserResponseDto {
  @ApiProperty({ 
    description: 'Unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@email.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Date when the user was created',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the user was last updated',
  })
  @IsDate()
  updatedAt: Date;
}
