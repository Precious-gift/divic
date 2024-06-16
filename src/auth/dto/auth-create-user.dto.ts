import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * Data transfer object for creating a new user.
 */
@InputType()
export class CreateUserInput {
  /**
   * The email of the user.
   */
  @Field()
  @IsEmail()
  email: string;

  /**
   * The password of the user.
   */
  @Field()
  @IsNotEmpty()
  password: string;

  /**
   * The biometric key of the user. This is an optional field.
   */
  @Field({ nullable: true })
  @IsOptional()
  biometricKey?: string;
}
