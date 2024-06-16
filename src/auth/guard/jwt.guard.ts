import { AuthGuard } from '@nestjs/passport';

/**
 * A guard that extends the built-in 'AuthGuard' from NestJS Passport module.
 * It uses the 'jwt' strategy for authentication.
 */
export class JwtGuard extends AuthGuard('jwt') {
  /**
   * Constructs a new instance of the JwtGuard class.
   * Calls the constructor of the parent class (AuthGuard).
   */
  constructor() {
    super();
  }
}
