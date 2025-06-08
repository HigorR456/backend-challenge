import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { GetUrlsByUserResponseDto, ResolveDto, ShortenDto, ShortenUrlResponseDto, ShortUrlsDto, UpdateUrlDto } from './url.dto';
import { OptionalAuthGuard } from 'src/auth/optional-auth.guard.ts';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/shared/entity';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from 'src/shared/decorators';

@Controller()
export class RedirectController {
  constructor(private urlService: UrlService) {}

  @Get(':shortCode')
  @ApiOperation({ summary: 'Resolve URL', description: 'Redirects to the original URL. ⚠️ Testing in Swagger will show "Failed to fetch" - this is expected behavior. Test directly in browser, example: http://localhost:4000/abc123.' })
  @ApiParam({ name: 'shortCode', description: 'ShortCode reference of the original URL', type: String  })
  @ApiResponse({
    status: 302,
    description: 'Redirects to the original URL',
    headers: {
      Location: {
        description: 'The original URL to redirect to',
        schema: { type: 'string', example: 'https://github.com/HigorR456' }
      }
  } })
  @ApiNotFoundResponse({ description: 'Short code not found' })
  @ApiBadRequestResponse({ description: 'Invalid short code' })
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
  @ApiOperation({ summary: 'Shorten URL', description: 'Create a shortened version of a URL. Authentication is optional - authenticated users can manage their URLs, while anonymous users can only create shortened URLs.' })
  @ApiBody({ description: 'URL to be shortened', type: ShortenDto })
  @ApiBearerAuth('accessToken')
  @ApiOkResponse({ description: 'Created shortened URL', type: ShortenUrlResponseDto, example: ShortenUrlResponseDto })
  @ApiBadRequestResponse({ description: 'Missing required fields' })
  async shortenUrl(
    @Body() data: ShortenDto,
    @User() user: UserEntity,
  ): Promise<ShortenUrlResponseDto> {
    return this.urlService.shortenUrl(data, user)
  }

  // TODO: add pagination and date sort filters
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Urls from authenticated user', description: 'Retrieve all Urls of the authenticated user' })
  @ApiBearerAuth('accessToken')
  @ApiOkResponse({ description: 'All Urls created by user', type: GetUrlsByUserResponseDto, example: GetUrlsByUserResponseDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  async getMyUrls(
    @Req() req: Request
  ): Promise<GetUrlsByUserResponseDto> {
    const user = req.user as UserEntity;
    return this.urlService.getUrlsByUser(user)
  }

  @Patch(':shortCode')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update shortened Url', description: 'Update the original Url of a ShortUrl owned by the authenticated user' })
  @ApiBearerAuth('accessToken')
  @ApiOkResponse({ description: 'Updated Url data', type: ShortUrlsDto, example: ShortUrlsDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  @ApiNotFoundResponse({ description: 'Short code not found' })
  async updateUrl(
    @Param('shortCode') shortCode: string,
    @Body() data: UpdateUrlDto,
    @User() user: UserEntity
  ): Promise<ShortUrlsDto> {
    return this.urlService.updateUrl(shortCode, data, user)
  }

  @Delete(':shortCode')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete Url', description: 'Soft delete the ShortUrl register owned by the authenticated user' })
  @ApiBearerAuth('accessToken')
  @ApiOkResponse({ description: 'Deleted Url data', type: ShortUrlsDto, example: ShortUrlsDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token' })
  @ApiNotFoundResponse({ description: 'Short code not found' })
  async deleteUrl(
    @Param('shortCode') shortCode: string,
    @User() user: UserEntity
  ): Promise<ShortUrlsDto> {
    return this.urlService.deleteUrl(shortCode, user)
  }
}
