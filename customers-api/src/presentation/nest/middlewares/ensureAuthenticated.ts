import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { AuthErrorMessageEnum } from '../../../domain/enums/auth/ErrorMessage';
import { TokenManagerProvider } from '../../../infra/providers/TokenManager';

/**
 * Middleware for logging requests and validating authentication tokens.
 *
 * @class
 * @implements {NestMiddleware}
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  /**
   * Logs incoming requests and validates authentication tokens.
   *
   * @param {Request} request - The incoming request object.
   * @param {Response} response - The outgoing response object.
   * @param {NextFunction} next - The next middleware function in the request-response cycle.
   */
  use(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
      return response.status(401).json({
        message: AuthErrorMessageEnum.AuthorizationHeaderMissing,
      });
    }

    const [, token] = authToken.split(' ');

    const tokenManager = new TokenManagerProvider();
    if (!tokenManager.validateToken(token)) {
      return response.status(401).json({
        message: AuthErrorMessageEnum.TokenInvalidOrExpired,
      });
    }

    return next();
  }
}
