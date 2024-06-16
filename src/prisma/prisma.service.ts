import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

/**
 * Class for managing the Prisma ORM in a NestJS application.
 * This class extends the PrismaClient class and initializes it with the database URL from the
 * configuration service.
 */
@Injectable()
export class PrismaService extends PrismaClient {
  /**
   * Creates a new instance of the PrismaService class.
   * @param config - The configuration service.
   */
  constructor(config: ConfigService) {
    // Initialize the PrismaClient with the database URL from the configuration service
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
