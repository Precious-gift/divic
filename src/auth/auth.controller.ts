import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';

/**
 * Controller for handling authentication related endpoints.
 */
@Controller('auth')
export class AuthController {
  /**
   * Creates an instance of AuthController.
   * @param {AuthService} authService - The authentication service.
   */
  constructor(private authService: AuthService) {}

  /**
   * Sign up a user.
   *
   * @param {AuthDto} dto - The authentication data transfer object.
   * @return {Promise<unknown>} The result of the sign up operation.
   */
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  /**
   * Sign in a user.
   *
   * @param {AuthDto} dto - The authentication data transfer object.
   * @return {Promise<unknown>} The result of the sign in operation.
   */
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
