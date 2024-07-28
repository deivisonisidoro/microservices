import dayjs from 'dayjs';

import { AbstractRefreshTokenRepository } from '../../application/repositories/RefreshToken';
import { RefreshTokenDTO } from '../../domain/dtos/auth/RefreshToken';
import { EnvironmentVariables } from '../configs/EnvironmentVariables';
import { PrismaClient } from '@prisma/client';

/**
 * Prisma implementation of the refresh token repository.
 *
 * @class
 * @implements {AbstractRefreshTokenRepository}
 */

export class PrismaRefreshTokenRepository
  implements AbstractRefreshTokenRepository
{
  /**
   * Constructs the PrismaCustomerRepository.
   * @param {PrismaClient} prisma - The Prisma client instance.
   */
  constructor(private prisma: PrismaClient) {}

  /**
   * Creates a new refresh token for the specified customer.
   *
   * @async
   * @param {string} customerId - The ID of the customer for whom the refresh token is created.
   * @returns {Promise<RefreshTokenDTO>} The generated refresh token.
   */
  async create(customerId: string): Promise<RefreshTokenDTO> {
    const env = EnvironmentVariables.getInstance();
    const refreshTokenExpiresIn = env.getRefreshTokenExpiresIn();
    const expiresIn = dayjs().add(Number(refreshTokenExpiresIn), 'hour').unix();

    const generateRefreshToken = await this.prisma.refreshToken.create({
      data: {
        customer_id: customerId,
        expires_in: expiresIn,
      },
    });

    return generateRefreshToken;
  }

  /**
   * Finds a refresh token by its ID.
   *
   * @async
   * @param {string} refreshToken - The ID of the refresh token to find.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token or undefined.
   */
  async findById(refreshToken: string): Promise<RefreshTokenDTO | unknown> {
    const token = await this.prisma.refreshToken.findFirst({
      where: {
        id: refreshToken,
      },
    });

    return token;
  }

  /**
   * Finds a refresh token by customer ID.
   *
   * @async
   * @param {string} customerId - The ID of the customer for whom to find the refresh token.
   * @returns {Promise<RefreshTokenDTO | unknown>} The found refresh token or undefined.
   */
  async findByCustomerId(
    customerId: string,
  ): Promise<RefreshTokenDTO | unknown> {
    const token = await this.prisma.refreshToken.findFirst({
      where: {
        customer_id: customerId,
      },
    });

    return token;
  }

  /**
   * Deletes a refresh token associated with the specified customer ID.
   *
   * @async
   * @param {string} customerId - The ID of the customer for whom to delete the refresh token.
   * @returns {Promise<void>} A Promise that resolves once the refresh token is deleted.
   */
  async delete(customerId: string): Promise<void> {
    await this.prisma.refreshToken.delete({
      where: {
        customer_id: customerId,
      },
    });
  }
}
