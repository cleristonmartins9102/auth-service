import { JSONType } from "@/data/model";
import { Controller } from "../contracts/controller";
import { HttpRequest, HttpResponse } from "../contracts/http";
import { Encrypt } from "@/data/domain";
import { ok, serverError } from "../helpers/http";
import { BuildValidator, Contracts } from "@cleriston.marina/val";

export class GenerateTokenController extends Controller<JSONType, string> {
  constructor (private readonly jwtAdapter: Encrypt<JSONType>) {
    super()
  }
  async perform (httpRequest: HttpRequest<any, any, any>): Promise<HttpResponse<string>> {
    try {
      const token = this.jwtAdapter.encrypt(httpRequest.body)
      return ok<string>(token)
    } catch (error) {
      switch ((error as Error).constructor.name) {
        case 'NoSecretFoundError': {
          return serverError('internal server error')
        }
        default:
          return serverError((error as Error).message)
      }
    }
  }

  buildValidator(): Contracts.Validation {
    return BuildValidator.object({
      name: BuildValidator.string(),
      surname: BuildValidator.string(),
      email: BuildValidator.email(),
      countryDialCode: BuildValidator.string()
    }) as any
  }
}