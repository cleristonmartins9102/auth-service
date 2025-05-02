import { HttpRequest, HttpResponse } from "./http";

export abstract class Controller<B = any,R = any,P = any,Q = any> {
  abstract perform (httpRequest: HttpRequest<B,P,Q>): Promise<HttpResponse<R>>
  async handler (httpRequest: HttpRequest<B,P,Q>): Promise<HttpResponse<R>> {
    return this.perform(httpRequest)
  }
}