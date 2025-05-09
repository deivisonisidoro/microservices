import dotenv from 'dotenv';

dotenv.config();

/**
 * Class to handle environment variables in a Node.js application.
 */
export class EnvironmentVariables {
  private static instance: EnvironmentVariables;

  /**
   * Constructs the EnvironmentVariables class. Private constructor to enforce singleton pattern.
   */
  private constructor() {}

  /**
   * Returns a singleton instance of the EnvironmentVariables class.
   * @returns The singleton instance of the EnvironmentVariables class.
   */
  public static getInstance(): EnvironmentVariables {
    if (!EnvironmentVariables.instance) {
      EnvironmentVariables.instance = new EnvironmentVariables();
    }
    return EnvironmentVariables.instance;
  }

  /**
   * Retrieves the database URL from environment variables.
   * @returns The database URL.
   */
  public getDatabaseURL(): string {
    return process.env.DATABASE_URL || '';
  }

  /**
   * Retrieves the database user from environment variables.
   * @returns The database user.
   */
  public getDatabaseUser(): string {
    return process.env.DATABASE_USER || '';
  }

  /**
   * Retrieves the database password from environment variables.
   * @returns The database password.
   */
  public getDatabasePassword(): string {
    return process.env.DATABASE_PASS || '';
  }

  /**
   * Retrieves the database host from environment variables.
   * @returns The database host.
   */
  public getDatabaseHost(): string {
    return process.env.DATABASE_HOST || '';
  }

  /**
   * Retrieves the database port from environment variables.
   * @returns The database port.
   */
  public getDatabasePort(): number {
    return parseInt(process.env.DATABASE_PORT || '5432', 10);
  }

  /**
   * Retrieves the current Node environment from environment variables.
   * @returns The Node environment.
   */
  public getNodeEnv(): string {
    return process.env.NODE_ENV || '';
  }

  /**
   * Retrieves the secret key from environment variables.
   * @returns The secret key.
   */
  public getSecretKey(): string {
    return process.env.SECRET_KEY || '';
  }
  
  /**
   * Retrieves the access token expiration time from environment variables.
   * @returns The access token expiration time.
   */
  public getAccessTokenExpiresIn(): string {
    return process.env.ACCESS_TOKEN_EXPIRES_IN || '';
  }

  /**
   * Retrieves the refresh token expiration time from environment variables.
   * @returns The refresh token expiration time.
   */
  public getRefreshTokenExpiresIn(): string {
    return process.env.REFRESH_TOKEN_EXPIRES_IN || '';
  }
  /**
   * Retrieves the host IP address from environment variables or automatically detects it if not provided.
   * @returns The host IP address.
   */
  public getHostIp(): string {
    return process.env.HOST_IP;
  }

  /**
   * Retrieves the host port from environment variables or defaults to 3001 if not provided.
   * @returns The host port number.
   */
  public getHostPort(): number {
    return parseInt(process.env.API_PORT || '3000', 10);
  }

  /**
   * Retrieves the host port from environment variables or defaults to 3001 if not provided.
   * @returns The host port number.
   */
  public getKafkaBroker(): string {
    return process.env.KAFKA_BROKER || 'localhost';
  }

  public geCustomerApiURL(): string {
    return process.env.CUSTOMER_API_URL || 'http://localhost:3001';
  }
}
