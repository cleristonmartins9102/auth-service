import { Auth } from "@/data/domain";
import { Controller } from "../contracts/controller";
import { HttpRequest, HttpResponse } from "../contracts/http";
import { ok, unauthorized } from "../helpers/http";

export class AuthenticationController extends Controller {
  constructor (private readonly authenticationUsecase: Auth) {super()}
  async perform(httpRequest: HttpRequest<any, any, any>): Promise<HttpResponse<any>> {
    try {
      return ok(await this.authenticationUsecase.auth(httpRequest.body))
    } catch (error) {
      return unauthorized('')
    }
  }
}