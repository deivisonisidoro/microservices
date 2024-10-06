import  dayjs from 'dayjs';
import { verify } from 'jsonwebtoken';

import { AbstractTokenManagerProvider } from '../../application/providers/TokenMagerProvider';
import { TokenManagerProvider } from './TokenManager';

jest.mock('jsonwebtoken', () => ({
  __esModule: true,
  verify: jest.fn(),
}));

describe('TokenManagerProvider', () => {
  let tokenManagerProvider: AbstractTokenManagerProvider;

  beforeEach(() => {
    tokenManagerProvider = new TokenManagerProvider();
  });

  describe('validateTokenAge', () => {
    it('should return true if token is expired', () => {
      const expiresIn = dayjs().subtract(1, 'day').unix();
      expect(tokenManagerProvider.validateTokenAge(expiresIn)).toBe(true);
    });

    it('should return false if token is not expired', () => {
      const expiresIn = dayjs().add(1, 'day').unix();
      expect(tokenManagerProvider.validateTokenAge(expiresIn)).toBe(false);
    });
  });

  describe('validateToken', () => {
    it('should return true if token is valid', () => {
      (verify as jest.Mock).mockReturnValueOnce(true);

      const token = 'valid_token';
      expect(tokenManagerProvider.validateToken(token)).toBe(true);
    });

    it('should return false if token is invalid', () => {
      (verify as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Invalid token');
      });

      const token = 'invalid_token';
      expect(tokenManagerProvider.validateToken(token)).toBe(false);
    });
  });
});
