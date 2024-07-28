import { AbstractRefreshTokenUseCase, RefreshTokenResponse } from '../../../../application/useCases/auth/refreshToken/AbstractRefreshToken'
import { RefreshTokenCustomerDTO } from '../../../../domain/dtos/auth/RefreshTokenCustomer'
import { IHttpErrors } from '../../helpers/IHttpErrors'
import { IHttpRequest } from '../../helpers/IHttpRequest'
import { IHttpResponse } from '../../helpers/IHttpResponse'
import { IHttpSuccess } from '../../helpers/IHttpSuccess'
import { HttpErrors } from '../../helpers/implementations/HttpErrors'
import { HttpResponse } from '../../helpers/implementations/HttpResponse'
import { HttpSuccess } from '../../helpers/implementations/HttpSuccess'
import { IController } from '../IController'

/**
 * Controller for handling requests to refresh authentication tokens.
 */
export class RefreshTokenUserController implements IController {
  /**
   * Creates an instance of RefreshTokenUserController.
   * @param refreshTokenUserUserCase The use case for refreshing authentication tokens.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private refreshTokenUserUserCase: AbstractRefreshTokenUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  /**
   * Handles an HTTP request to refresh authentication tokens.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error
    let response: RefreshTokenResponse

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body)

      if (bodyParams.includes('refreshTokenId')) {
        const refreshTokenId = httpRequest.body as RefreshTokenCustomerDTO

        response = await this.refreshTokenUserUserCase.execute(refreshTokenId)
      } else {
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (response.isLeft()) {
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.value)
      }
      const success = this.httpSuccess.success_200(response.value)
      return new HttpResponse(success.statusCode, success.body)
    }

    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
