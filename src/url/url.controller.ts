import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { ResolveDto, ShortenDto, UpdateUrlDto } from './url.dto';
import { OptionalAuthGuard } from 'src/auth/optional-auth.guard.ts';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/shared/entity';

@Controller()
export class RedirectController {
  constructor(private urlService: UrlService) {}

  @Get(':shortCode')
  async resolveUrl(
    @Param() data: ResolveDto,
    @Res() res: Response,
  ) {
    const originalUrl = await this.urlService.resolveUrl(data)
    return res.redirect(302, originalUrl);
  }
}

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post('shorten')
  @UseGuards(OptionalAuthGuard)
  async shortenUrl(
    @Body() data: ShortenDto,
    @Req() req: Request
  ) {
    const user = req.user as User;
    return await this.urlService.shortenUrl(data, user)
  }

  @Get('my')
  @UseGuards(AuthGuard('jwt'))
  async getMyUrls(
    @Req() req: Request
  ) {
    const user = req.user as User;
    return await this.urlService.getUrlsByUser(user)
  }

  @Patch(':shortCode')
  @UseGuards(AuthGuard('jwt'))
  async updateUrl(
    @Param('shortCode') shortCode: string,
    @Body() data: UpdateUrlDto,
    @Req() req: Request
  ) {
    const user = req.user as User;
    return await this.urlService.updateUrl(shortCode, data, user)
  }

  @Delete(':shortCode')
  @UseGuards(AuthGuard('jwt'))
  async deleteUrl(
    @Param('shortCode') shortCode: string,
    @Req() req: Request
  ) {
    const user = req.user as User;
    return await this.urlService.deleteUrl(shortCode, user)
  }
}
