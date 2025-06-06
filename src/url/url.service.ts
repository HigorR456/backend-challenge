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

    const domainUrl = process.env.DOMAIN_URL || 'http://localhost';
    const fullUrl = `${domainUrl}/${shortCode}`;

    return fullUrl;
  }

  async resolveUrl({ shortCode }: ResolveDto): Promise<string> {
    const shortUrl = await this.ormService.shortUrl.update({
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

    if (!shortUrl) {
      throw new NotFoundException();
    }

    return shortUrl.originalUrl;
  }

  async getUrlsByUser(user: User) {
    return await this.ormService.shortUrl.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateUrl(shortCode: string, data: UpdateUrlDto, user: User) {
    const shortUrl = await this.ormService.shortUrl.findUnique({
      where: {
        shortCode,
        deletedAt: null,
        userId: user.id,
      },
    });
  
    if (!shortUrl) {
      throw new NotFoundException();
    }
  
    return await this.ormService.shortUrl.update({
      where: { id: shortUrl.id },
      data: {
        originalUrl: data.originalUrl,
        updatedAt: new Date(),
      },
    });
  }

  async deleteUrl(id: string, user: User) {
    const shortUrl = await this.ormService.shortUrl.findUnique({
      where: {
        id,
        deletedAt: null,
        userId: user.id,
      },
    });

    if (!shortUrl) {
      throw new NotFoundException();
    }

    return await this.ormService.shortUrl.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      }
    });
  }
}
