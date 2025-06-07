import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class ShortenDto {
  @ApiProperty({
    description: 'The original URL',
    example: 'https://www.github.com/HigorR456'
  })
  @IsString()
  originalUrl: string;
}

export class ResolveDto {
  @ApiProperty({
    description: 'The shortcode of the shortened URL',
    example: '/abc123'
  })
  @IsString()
  @MaxLength(6)
  shortCode: string;
}

export class UpdateUrlDto {
  @ApiProperty({
    description: 'The original URL',
    example: 'https://www.github.com/HigorR456'
  })
  @IsString()
  originalUrl: string;
}

export class ShortUrlsDto {
  @ApiProperty({
    description: 'The original URL',
    example: 'https://www.github.com/HigorR456',
  })
  originalUrl: string;

  @ApiProperty({
    description: 'The shortcode of the shortened URL',
    example: '/abc123',
  })
  shortCode: string;

  @ApiProperty({
    description: 'The unique identifier of the shortened URL',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'The date and time when the URL was created',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the URL was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The unique identifier of the user who created the URL, or null if not associated with a user',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string | null;

  @ApiProperty({
    description: 'The number of times the shortened URL has been accessed',
    example: 10,
  })
  clickCount: number;
}[]

export class GetUrlsByUserResponseDto {
  @ApiProperty({
   type: ShortUrlsDto,
   isArray: true,
  })
  urls: ShortUrlsDto[];
}

export class ShortenUrlResponseDto {
  @ApiProperty({
    description: "The shortened URL",
    example: "http://localhost/abc123"
  })
  fullUrl: string;
}
