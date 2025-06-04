import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private ormService: PrismaService) {}

  async getProfile(id: string): Promise<any> {
    return this.ormService.user.findUnique({
      where: {
        id
      },
      select: {
        passwordHash: false
      }
    });
  }
}
