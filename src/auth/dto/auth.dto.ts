import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * Data transfer object for user authentication.
 * This class represents the input data for user authentication,
 * including the user's email and password.
 */
export class AuthDto {
  /**
   * Email of the user.
   *
   * @example 'user@example.com'
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Password of the user.
   *
   * @example 'password'
   */
  @IsString()
  @IsNotEmpty()
  password: string;

  /**
   * Biometric key of the user.
   * This is optional and can be used for biometric authentication.
   *
   * @example 'biometric-key'
   */
  @IsString()
  biometricKey?: string;
}
