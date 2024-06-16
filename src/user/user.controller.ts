import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

/**
 * Controller for handling user-related endpoints.
 */
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  /**
   * Get the authenticated user's information.
   *
   * @param user - The authenticated user.
   * @returns The user object.
   */
  @Get('me')
  getMe(@GetUser() user: User) {
    console.log({ user });
    return user;
  }

  /**
   * Edit the authenticated user's information.
   *
   * Currently, this method is not implemented.
   */
  @Patch()
  editUser() {}
}
