import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { customAlphabet } from 'nanoid';
import { ResolveDto, ShortenDto, UpdateUrlDto } from './url.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/shared/entity';

@Injectable()
export class UrlService {
  constructor(private ormService: PrismaService) {}

  private nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 6);

  async shortenUrl({ originalUrl }: ShortenDto, user?: User): Promise<string> {
    const shortCode = this.nanoid();

    await this.ormService.shortUrl.create({
      data: {
        originalUrl,
        shortCode,
        userId: user?.id || null,
      }
    });

    const baseUrl = process.env.BASE_URL || 'http://localhost';
    const port = process.env.PORT || '4000';
    const fullUrl = `${baseUrl}:${port}/${shortCode}`;

    return fullUrl;
  }

  async resolveUrl({ shortCode }: ResolveDto): Promise<string> {
    const { originalUrl } = await this.ormService.shortUrl.update({
      where: { shortCode },
      data: {
        clickCount: {
          increment: 1,
        },
      },
      select: {
        originalUrl: true,
      },
    });

    return originalUrl;
  }

  async getUrlsByUser(user: User) {
    return await this.ormService.shortUrl.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateUrl(shortCode: string, data: UpdateUrlDto, user: User) {
    const existing = await this.ormService.shortUrl.findUnique({
      where: {
        shortCode,
        deletedAt: null,
        userId: user.id,
      },
    });
  
    if (!existing) {
      throw new NotFoundException();
    }
  
    if (existing.userId !== user.id) {
      throw new ForbiddenException();
    }
  
    return this.ormService.shortUrl.update({
      where: { id: existing.id },
      data: {
        originalUrl: data.originalUrl,
        updatedAt: new Date(),
      },
    });
  }

  async deleteUrl(id: string, user: any) {
    const existing = await this.ormService.shortUrl.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException();
    }

    if (existing.userId !== user?.id) {
      throw new ForbiddenException();
    }

    return this.ormService.shortUrl.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      }
    });
  }
}
