import { IsString, IsUUID } from 'class-validator';

export class GetProfileDto {
  @IsString()
  @IsUUID()
  id: string;
}
