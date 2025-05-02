export interface Auth {
  auth (params: Auth.Params): Promise<Auth.Result>
}

export namespace Auth {
  export type Result = {
    token: string
    refreshToken: string
  }
  export type Params = {
    email: string
    password: string
  }
}