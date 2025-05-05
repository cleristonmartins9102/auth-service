import jsonwebtoken from 'jsonwebtoken'

import { UserModel } from "@/data/model";
import { ExpiredTokenError, JwtAdapterError, NoSecretFoundError } from '@/application/errors/errors';
import { Decrypt, Encrypt } from "@/data/domain"
export class JwtAdapter implements Encrypt<UserModel>, Decrypt<UserModel> {
  encrypt (payload: UserModel, expireAt: Encrypt.ExpireAt): string {
    const secretKey = process.env.SECRET_KEY!
    if (undefined === secretKey) throw new NoSecretFoundError()
      try {
        return jsonwebtoken.sign(payload as object, secretKey, { expiresIn: expireAt }) 
      } catch (error) {
        throw new JwtAdapterError(error as Error)
      }
  }

  decrypt(value: string): UserModel & { iat: number } {
    const secretKey = process.env.SECRET_KEY!
    if (undefined === secretKey) throw new NoSecretFoundError()
    try {
      return jsonwebtoken.verify(value, secretKey) as any
    } catch (error) {
      throw new ExpiredTokenError(error as Error)
    }
  }
}