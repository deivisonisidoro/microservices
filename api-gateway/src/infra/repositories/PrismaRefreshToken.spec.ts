import dayjs from 'dayjs';
import { PrismaRefreshTokenRepository } from './PrismaRefreshToken';
import { AbstractRefreshTokenRepository } from '../../application/repositories/RefreshToken';
import { EnvironmentVariables } from '../configs/EnvironmentVariables';

// Mock the PrismaService
const prismaServiceMock = {
  refreshToken: {
    create: jest.fn(),
    findFirst: jest.fn(),
    delete: jest.fn(),
  },
};

describe('PrismaRefreshTokenRepository', () => {
  let repository: AbstractRefreshTokenRepository;

  beforeEach(() => {
    // Create an instance of the repository, passing the mocked PrismaService
    repository = new PrismaRefreshTokenRepository(prismaServiceMock as any);
  });

  afterEach(() => {
    // Clear all mock data between tests
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

      prismaServiceMock.refreshToken.create.mockResolvedValue(generatedToken);

      const result = await repository.create(customerId);

      expect(prismaServiceMock.refreshToken.create).toHaveBeenCalledWith({
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

      prismaServiceMock.refreshToken.findFirst.mockResolvedValue(foundToken);

      const result = await repository.findById(refreshTokenId);

      expect(prismaServiceMock.refreshToken.findFirst).toHaveBeenCalledWith({
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

      prismaServiceMock.refreshToken.findFirst.mockResolvedValue(foundToken);

      const result = await repository.findByCustomerId(customerId);

      expect(prismaServiceMock.refreshToken.findFirst).toHaveBeenCalledWith({
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

      expect(prismaServiceMock.refreshToken.delete).toHaveBeenCalledWith({
        where: {
          customer_id: customerId,
        },
      });
    });
  });
});
