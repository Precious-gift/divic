import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * Data transfer object for user login input.
 * This class represents the input data for user login,
 * including the user's email and password.
 */
@InputType()
export class LoginUserInput {
  /**
   * The user's email.
   */
  @Field()
  @IsEmail()
  email: string;

  /**
   * The user's password.
   */
  @Field()
  @IsNotEmpty()
  password: string;
}
