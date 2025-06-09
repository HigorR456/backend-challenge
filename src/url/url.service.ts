import { Injectable, NotFoundException } from '@nestjs/common';
import { customAlphabet } from 'nanoid';
import { GetUrlsByUserResponseDto, ResolveDto, ShortenDto, ShortenUrlResponseDto, UpdateUrlDto } from './url.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/shared/entity';
import { ShortUrl } from '@prisma/client';

@Injectable()
export class UrlService {
  constructor(private ormService: PrismaService) {}

  private nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 6);

  async shortenUrl({ originalUrl }: ShortenDto, user?: UserEntity): Promise<ShortenUrlResponseDto> {
    const shortCode = this.nanoid();

    const normalizedUrl = /^https?:\/\//i.test(originalUrl) ? originalUrl : `https://${originalUrl}`;

    await this.ormService.shortUrl.create({
      data: {
        originalUrl: normalizedUrl,
        shortCode,
        userId: user?.id || null,
      }
    });

    const domainUrl = process.env.DOMAIN_URL || 'http://localhost';
    const fullUrl = `${domainUrl}/${shortCode}`;

    return { fullUrl };
  }

  async resolveUrl({ shortCode }: ResolveDto): Promise<string> {
    const shortUrl = await this.ormService.shortUrl.update({
      where: {
        shortCode,
        deletedAt: null,
      },
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
      throw new NotFoundException('Short code not found');
    }

    return shortUrl.originalUrl;
  }

  async getUrlsByUser(user: UserEntity): Promise<GetUrlsByUserResponseDto> {
    const urls = await this.ormService.shortUrl.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return { urls };
  }

  async updateUrl(shortCode: string, data: UpdateUrlDto, user: UserEntity): Promise<ShortUrl> {
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

  async deleteUrl(shortCode: string, user: UserEntity): Promise<ShortUrl> {
    const shortUrl = await this.ormService.shortUrl.findUnique({
      where: {
        shortCode,
        deletedAt: null,
        userId: user.id,
      },
    });

    console.log(shortUrl, user)

    if (!shortUrl) {
      throw new NotFoundException();
    }

    return await this.ormService.shortUrl.update({
      where: { shortCode },
      data: {
        deletedAt: new Date(),
      }
    });
  }
}
