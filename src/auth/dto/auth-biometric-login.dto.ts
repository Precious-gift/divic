import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

/**
 * Data transfer object for biometric login input.
 */
@InputType()
export class BiometricLoginInput {
  /**
   * The biometric key used for login.
   */
  @Field()
  @IsOptional()
  biometricKey: string;
}
