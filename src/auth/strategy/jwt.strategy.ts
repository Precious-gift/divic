import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

/**
 * JWT strategy for authentication using Passport.
 */
@Injectable()
export class JwtStategy extends PassportStrategy(Strategy, 'jwt') {
  /**
   * Initializes the JWT strategy.
   * @param config - The configuration service.
   * @param prisma - The Prisma service.
   */
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  /**
   * Validates the JWT payload.
   * @param payload - The JWT payload.
   * @returns The user object.
   */
  async validate(payload: { sub: number; email: string }) {
    // Find the user by ID from the database.
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    // Remove the password from the user object.
    delete user.password;
    // Return the user object.
    return user;
  }
}
