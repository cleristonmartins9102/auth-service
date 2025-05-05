import { JSONType } from "@/data/model";
import { Controller } from "../contracts/controller";
import { HttpRequest, HttpResponse } from "../contracts/http";
import { CreateCredential } from "@/data/domain";
import { ok, serverError } from "../helpers/http";
import { BuildValidator, Contracts } from "@cleriston.marina/val";

export class CreateCredentialController extends Controller<JSONType, string> {
  constructor (private readonly dbCreateCredential: CreateCredential) {
    super()
  }
  async perform (httpRequest: HttpRequest<any, any, any>): Promise<HttpResponse<string>> {
    try {
      const credential = this.dbCreateCredential.create(httpRequest.body)
      return ok(credential) as any
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
      password: BuildValidator.string(),
      countryDialCode: BuildValidator.string(),
      phoneNumber: BuildValidator.string()
    }) as any
  }
}