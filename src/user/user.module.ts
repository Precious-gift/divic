import { Module } from '@nestjs/common';

// Import the UserController class
import { UserController } from './user.controller';

/**
 * Module for the User related endpoints.
 * This module provides the UserController as a global provider
 * and exports it for use in other modules.
 */
@Module({
  // Define the controllers for this module
  controllers: [UserController],
})
export class UserModule {}
