import jsonwebtoken from 'jsonwebtoken'

import { JSONType } from "@/data/model";

export class JwtAdapter {
  encrypt (payload: JSONType): string {
    const secretKey = process.env.SECRET_KEY!
    return jsonwebtoken.sign(Buffer.from(JSON.stringify(payload)), secretKey)
  }
}