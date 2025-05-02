import jsonwebtoken from 'jsonwebtoken'

import { JSONType } from "@/data/model";
import { NoSecretFoundError } from '@/application/errors/errors';

export class JwtAdapter {
  encrypt (payload: JSONType): string {
    const secretKey = process.env.SECRET_KEY!
    if (secretKey === undefined) throw new NoSecretFoundError()
    return jsonwebtoken.sign(Buffer.from(JSON.stringify(payload)), secretKey)
  }
}