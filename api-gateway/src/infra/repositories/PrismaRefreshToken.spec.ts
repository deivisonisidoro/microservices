import { Test, TestingModule } from '@nestjs/testing';
import * as dayjs from 'dayjs';

import { AbstractRefreshTokenRepository } from '../../application/repositories/RefreshToken';
import { EnvironmentVariables } from '../configs/EnvironmentVariables';
import { PrismaService } from '../database/nestPrisma/prisma.service';
import { PrismaRefreshTokenRepository } from './PrismaRefreshToken';

describe('PrismaRefreshTokenRepository', () => {
  let repository: AbstractRefreshTokenRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaRefreshTokenRepository,
        {
          provide: PrismaService,
          useValue: {
            refreshToken: {
              create: jest.fn(),
              findFirst: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<PrismaRefreshTokenRepository>(
      PrismaRefreshTokenRepository,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a refresh token', async () => {
      const customerId = 'customerId';
      const env = EnvironmentVariables.getInstance();
      const refreshTokenExpiresIn = env.getRefreshTokenExpiresIn();
      const expiresIn = dayjs()
        .add(Number(refreshTokenExpiresIn), 'hour')
        .unix();
      const generatedToken = {
        id: 'token_id',
        customer_id: customerId,
        expires_in: expiresIn,
      };

      (prismaService.refreshToken.create as jest.Mock).mockResolvedValue(
        generatedToken,
      );

      const result = await repository.create(customerId);

      expect(prismaService.refreshToken.create).toHaveBeenCalledWith({
        data: {
          customer_id: customerId,
          expires_in: expiresIn,
        },
      });
      expect(result).toEqual(generatedToken);
    });
  });

  describe('findById', () => {
    it('should find a refresh token by ID', async () => {
      const refreshTokenId = 'token_id';
      const foundToken = {
        id: refreshTokenId,
        customer_id: 'customerId',
        expires_in: 123456,
      };

      (prismaService.refreshToken.findFirst as jest.Mock).mockResolvedValue(
        foundToken,
      );

      const result = await repository.findById(refreshTokenId);

      expect(prismaService.refreshToken.findFirst).toHaveBeenCalledWith({
        where: {
          id: refreshTokenId,
        },
      });
      expect(result).toEqual(foundToken);
    });
  });

  describe('findByCustomerId', () => {
    it('should find a refresh token by customer ID', async () => {
      const customerId = 'customerId';
      const foundToken = {
        id: 'token_id',
        customer_id: customerId,
        expires_in: 123456,
      };

      (prismaService.refreshToken.findFirst as jest.Mock).mockResolvedValue(
        foundToken,
      );

      const result = await repository.findByCustomerId(customerId);

      expect(prismaService.refreshToken.findFirst).toHaveBeenCalledWith({
        where: {
          customer_id: customerId,
        },
      });
      expect(result).toEqual(foundToken);
    });
  });

  describe('delete', () => {
    it('should delete a refresh token by customer ID', async () => {
      const customerId = 'customerId';

      await repository.delete(customerId);

      expect(prismaService.refreshToken.delete).toHaveBeenCalledWith({
        where: {
          customer_id: customerId,
        },
      });
    });
  });
});
