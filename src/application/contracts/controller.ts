import { badRequest } from "../helpers/http";
import { HttpRequest, HttpResponse } from "./http";
import { Contracts, BuildValidator } from '@cleriston.marina/validator'
export abstract class Controller<B = any,R = any,P = any,Q = any> {
  abstract perform (httpRequest: HttpRequest<B,P,Q>): Promise<HttpResponse<R>>
  async handler (httpRequest: HttpRequest<B,P,Q>): Promise<HttpResponse<R>> {
    const validator: Contracts.Validation = this.buildValidator()
    const { success, error }: any = validator.validate(httpRequest.body)
    if (!success) return badRequest(error) as any
    return await this.perform(httpRequest)
  }

  buildValidator (): Contracts.Validation {
    return BuildValidator.object({}) as any
  }
}