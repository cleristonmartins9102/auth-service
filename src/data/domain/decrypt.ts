import { UserModel } from "../model"

export interface Decrypt {
  decrypt (value: string): Decrypt.Return
}

export namespace Decrypt {
  export type Return = UserModel & { iat: number, exp: number }
}