import jsonwebtoken from 'jsonwebtoken'

import { UserModel } from "@/data/model";
import { JwtAdapterError, NoSecretFoundError } from '@/application/errors/errors';
import { Encrypt } from "@/data/domain"
export class JwtAdapter implements Encrypt<UserModel> {
  encrypt (payload: UserModel): string {
    const secretKey = process.env.SECRET_KEY!
    if (undefined === secretKey) throw new NoSecretFoundError()
      try {
        return jsonwebtoken.sign(payload as object, secretKey, { expiresIn: '1h' }) 
      } catch (error) {
        throw new JwtAdapterError(error as Error)
      }
  }
}