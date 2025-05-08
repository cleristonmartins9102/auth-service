import { ValidateToken } from "@/data/domain";
import { Controller } from "../contracts/controller";
import { HttpRequest, HttpResponse } from "../contracts/http";
import { ok, unauthorized } from "../helpers/http";

export class ValidateTokenController extends Controller {
  constructor (private readonly validateTokenUsecase: ValidateToken) {
    super()
  }
  async perform(httpRequest: HttpRequest<any, any, any>): Promise<HttpResponse<any>> {
    const { token, refreshToken } = httpRequest.body
    try {
      return ok(await this.validateTokenUsecase.validate(token, refreshToken))
    } catch (error) {
      console.log(error)
      return unauthorized({ message: 'unauthorized'})
    }
  }
}