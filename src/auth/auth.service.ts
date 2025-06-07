import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto, LoginDto, RegisterDto } from './auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private ormService: PrismaService,
    private jwt: JwtService,
  ) {}

  async validateUser({ email, password }: LoginDto): Promise<AuthResponseDto> {
    const user = await this.ormService.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: this.jwt.sign(payload),
      tokenType: 'Bearer',
      expiresIn: process.env.JWT_EXPIRATION,
    };
  }

  async register({ email, password }: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.ormService.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.ormService.user.create({
      data: {
        email,
        passwordHash,
      },
    });

    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: this.jwt.sign(payload),
      tokenType: 'Bearer',
      expiresIn: process.env.JWT_EXPIRATION,
    };
  }
}