import { Module } from '@nestjs/common';
import { RedirectController, UrlController } from './url.controller';
import { UrlService } from './url.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UrlController, RedirectController],
  providers: [UrlService, PrismaService]
})
export class UrlModule {}
