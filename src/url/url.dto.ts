import { IsString, MaxLength } from 'class-validator';

export class ShortenDto {
  @IsString()
  originalUrl: string;
}

export class ResolveDto {
  @IsString()
  @MaxLength(6)
  shortCode: string;
}

export class UpdateUrlDto {
  @IsString()
  originalUrl: string;
}
