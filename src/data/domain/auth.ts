import { UserModel } from "../model"

export interface Auth {
  auth (params: Auth.Params): Promise<Auth.Result>
}

export namespace Auth {
  export type Result = {
    token: string
    refreshToken: string
    payload: UserModel & { iat: number }
  }
  export type Params = {
    email: string
    password: string
  }
}