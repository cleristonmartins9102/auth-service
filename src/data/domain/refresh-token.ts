export interface RefreshToken {
  refresh (refreshToken: string): Promise<void>
}