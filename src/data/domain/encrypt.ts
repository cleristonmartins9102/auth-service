export interface Encrypt<P> {
  encrypt (value: P, expireAt: Encrypt.ExpireAt): string
}

export namespace Encrypt {
  type Unit = 'h' | 'm'
  export type ExpireAt = `${number}${Unit}` | `${number}${Uppercase<Unit>}` | `${number}${Lowercase<Unit>}`
}