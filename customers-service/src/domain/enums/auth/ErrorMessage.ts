/**
 * Enum representing error messages related to authentication.
 *
 * @enum
 */
export enum AuthErrorMessageEnum {
  /**
   * Error type indicating that the provided email or password is incorrect.
   */
  EmailOrPasswordWrong = 'Email or password incorrect.',
  /**
   * Message indicating that the authentication token is either invalid or expired.
   */
  TokenInvalidOrExpired = 'Token invalid or expired',
  /**
   * Message indicating that the Authorization header is missing in the request.
   */
  AuthorizationHeaderMissing = 'Authorization header missing',
}
