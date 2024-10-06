/**
 * Data transfer object (DTO) representing a login request.
 */
export class LoginRequestDTO {
  /**
   * The email address of the customer. Required and must not be empty.
   *
   * @swagger
   * required: true
   * type: string
   * description: The email address of the customer.
   * example: customer@example.com
   */
  email: string;

  /**
   * The password of the customer. Required and must not be empty.
   *
   * @swagger
   * required: true
   * type: string
   * description: The password of the customer.
   * example: password123
   */
  password: string;

  /**
   * Constructor to initialize LoginRequestDTO with email and password.
   *
   * @param email - The email address of the customer.
   * @param password - The password of the customer.
   */
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
