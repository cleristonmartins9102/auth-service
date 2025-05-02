import jsonwebtoken from 'jsonwebtoken'

import { JSONType } from "@/data/model";
import { JwtAdapterError, NoSecretFoundError } from '@/application/errors/errors';

export class JwtAdapter {
  encrypt (payload: JSONType): string {
    const secretKey = process.env.SECRET_KEY!
    if (secretKey === undefined) throw new NoSecretFoundError()
      try {
        return jsonwebtoken.sign(Buffer.from(JSON.stringify(payload)), secretKey) 
      } catch (error) {
        throw new JwtAdapterError(error as Error)
      }
  }
}