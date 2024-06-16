import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput, LoginUserInput } from 'src/auth/dto';

/**
 * Resolver for User related operations
 */
@Resolver(() => User)
export class UserResolver {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  /**
   * Query to get all users
   * @returns Promise of User array
   */
  @Query(() => User)
  async users(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  /**
   * Mutation to signup a new user
   * @param input - CreateUserInput object
   * @returns Promise of access_token string
   */
  @Mutation(() => String)
  async signUp(
    @Args('input') input: CreateUserInput,
  ): Promise<string | { access_token: string }> {
    const { access_token } = await this.authService.signup(input);
    return JSON.stringify(access_token);
  }

  /**
   * Mutation to signin an existing user
   * @param input - LoginUserInput object
   * @returns Promise of access_token string
   */
  @Mutation(() => String)
  async signin(
    @Args('input') input: LoginUserInput,
  ): Promise<string | { access_token: string }> {
    const { access_token } = await this.authService.signin(input);
    return JSON.stringify(access_token);
  }

  /**
   * Mutation to signin a user using biometric authentication
   * @param input - LoginUserInput object
   * @returns Promise of access_token string
   */
  @Mutation(() => String)
  async biometricSignin(
    @Args('input') input: LoginUserInput,
  ): Promise<string | { access_token: string }> {
    const { access_token } = await this.authService.biometricSignin(input);
    return JSON.stringify(access_token);
  }
}
