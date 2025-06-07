import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponseDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private ormService: PrismaService) {}

  async getProfile({ id }: { id: string }): Promise<UserResponseDto> {
    return await this.ormService.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        email: true,
        updatedAt: true,
        createdAt: true,
      }
    });
  }
}
