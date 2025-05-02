import { JSONType } from "@/data/model";
import { Controller } from "../contracts/controller";
import { HttpRequest, HttpResponse } from "../contracts/http";
import { Encrypt } from "@/data/domain";

export class GenerateTokenController extends Controller<JSONType, string> {
  constructor (private readonly jwtAdapter: Encrypt<JSONType>) {
    super()
  }
  async perform (httpRequest: HttpRequest<any, any, any>): Promise<HttpResponse<string>> {
    const token = this.jwtAdapter.encrypt(httpRequest.body)
    return {
      statusCode: 200,
      body: ''
    }
  }
}