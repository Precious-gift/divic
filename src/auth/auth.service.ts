import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Service for handling user authentication.
 */
@Injectable()
export class AuthService {
  /**
   * Constructor for the AuthService.
   * @param prisma - The Prisma service.
   * @param jwt - The JWT service.
   * @param config - The configuration service.
   */
  constructor(
    public prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  /**
   * Sign up a new user.
   * @param dto - The authentication data transfer object.
   * @returns The signed token for the user.
   * @throws ForbiddenException if the email is already taken.
   */
  async signup(dto: AuthDto) {
    // Generate the password hash
    const hash = await argon.hash(dto.password);

    // Save the new user in the database
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          ...(dto.biometricKey && { biometricKey: dto.biometricKey }),
        },
      });

      // Return the signed token for the user
      const access_token = await this.signToken(user.id, user.email);
      return { access_token };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }
  }

  /**
   * Sign in an existing user.
   * @param dto - The authentication data transfer object.
   * @returns The signed token for the user.
   * @throws ForbiddenException if the credentials are incorrect.
   */
  async signin(dto: AuthDto) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // Throw an exception if the user does not exist
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // Compare the password
    const pwMatches = await argon.verify(user.password, dto.password);

    // Throw an exception if the password is incorrect
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // Return the signed token for the user
    return this.signToken(user.id, user.email);
  }

  /**
   * Sign in a user using biometric authentication.
   * @param dto - The authentication data transfer object.
   * @returns The signed token for the user.
   * @throws ForbiddenException if the credentials are incorrect.
   */
  async biometricSignin(dto: AuthDto) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // Throw an exception if the user does not exist
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // Compare the password
    const bioMatches: boolean = user.password === dto.password;

    // Throw an exception if the password is incorrect
    if (!bioMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // Return the signed token for the user
    return this.signToken(user.id, user.email);
  }

  /**
   * Sign the token for a user.
   * @param userId - The ID of the user.
   * @param email - The email of the user.
   * @returns The signed token for the user.
   */
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return { access_token: token };
  }
}
