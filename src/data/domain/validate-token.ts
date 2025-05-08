import { UserModel } from "../model";

export interface ValidateToken {
  validate (token: string, refreshToken: string): Promise<ValidateToken.Return>
}

export namespace ValidateToken {
  export type Return = { token: string, refreshToken: string, payload: UserModel}
}