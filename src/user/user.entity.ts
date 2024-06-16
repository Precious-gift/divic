import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

/**
 * Class representing a user entity.
 */
@ObjectType()
export class User {
  /**
   * Unique identifier for the user.
   */
  @Field(() => Int)
  id: number;

  /**
   * Date and time when the user was created.
   */
  @Field()
  createdAt: Date;

  /**
   * Date and time when the user was last updated.
   */
  @Field()
  updatedAt: Date;

  /**
   * Email address of the user.
   */
  @Field()
  email: string;

  /**
   * Password for the user.
   */
  @Field()
  password: string;

  /**
   * Biometric key associated with the user.
   * This is optional and can be null.
   */
  @Field({ nullable: true })
  @IsOptional()
  biometricKey?: string;
}
