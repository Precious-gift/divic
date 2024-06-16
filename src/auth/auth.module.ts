import { Global, Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStategy } from './strategy';

/**
 * Module for authentication related features.
 * This module provides the necessary controllers and services for user authentication.
 * It also configures the JWT module and exports the AuthService for use in other modules.
 */
@Global() // Make this module global so it can be imported in any module
@Module({
  // Import the JWT module and configure it with an empty set of options
  imports: [JwtModule.register({})],

  // Export the AuthController and JwtStategy for use in other modules
  controllers: [AuthController],
  providers: [AuthService, JwtStategy],

  // Export the AuthService for use in other modules
  exports: [AuthService],
})
export class AuthModule {}
