import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private ormService: PrismaService,
    private jwt: JwtService,
  ) {}

  async validateUser({ email, password }: LoginDto) {
    const user = await this.ormService.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    return { acessToken: this.jwt.sign(payload) };
  }

  async register({ email, password }: RegisterDto) {
    const existingUser = await this.ormService.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.ormService.user.create({
      data: {
        email,
        passwordHash,
      },
    });

    const payload = { sub: user.id, email: user.email };

    return { acessToken: this.jwt.sign(payload) };
  }
}