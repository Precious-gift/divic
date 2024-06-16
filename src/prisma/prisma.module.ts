import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

/**
 * Module for the Prisma ORM.
 * This module provides the Prisma service as a global provider and exports it for use in other modules.
 */
@Global() // Global scope for Prisma service
@Module({
  providers: [PrismaService], // Provide Prisma service
  exports: [PrismaService], // Export Prisma service for use in other modules
})
export class PrismaModule {}
