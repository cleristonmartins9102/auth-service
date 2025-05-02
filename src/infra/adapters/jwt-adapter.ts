import jsonwebtoken from 'jsonwebtoken'

import { JSONType } from "@/data/model";
import { JwtAdapterError, NoSecretFoundError } from '@/application/errors/errors';
import { Encrypt } from "@/data/domain"
export class JwtAdapter implements Encrypt<JSONType> {
  encrypt (payload: JSONType): string {
    const secretKey = process.env.SECRET_KEY!
    if (undefined === secretKey) throw new NoSecretFoundError()
      try {
        return jsonwebtoken.sign(Buffer.from(JSON.stringify(payload)), secretKey, { expiresIn: 3600 }) 
      } catch (error) {
        throw new JwtAdapterError(error as Error)
      }
  }
}