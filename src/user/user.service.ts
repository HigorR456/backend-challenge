import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetProfileDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private ormService: PrismaService) {}

  async getProfile({ id }: GetProfileDto): Promise<any> {
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
