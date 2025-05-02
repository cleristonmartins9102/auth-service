export interface Compare {
  compare (password: string, hash: string): Promise<boolean>
}