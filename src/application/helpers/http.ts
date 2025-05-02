import { HttpResponse } from "../contracts/http";

export const ok = <B>(body: B ): HttpResponse<B> => ({ statusCode: 200, body })
export const serverError = <B>(body: any ): HttpResponse<B> => ({ statusCode: 500, body })
export const badRequest = <B>(body: any ): HttpResponse<B> => ({ statusCode: 400, body })