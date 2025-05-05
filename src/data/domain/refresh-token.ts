export interface RefreshToken {
  refresh (refreshToken: string): Promise<RefreshToken.Return>
}

export namespace RefreshToken {
  export type Return = {
    token: string
    refreshToken: string
  }
}