import { HttpResponse } from "../contracts/http";

export const ok = <B>(body: B ): HttpResponse<B> => ({ statusCode: 200, body })