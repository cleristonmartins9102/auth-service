import jsonwebtoken from 'jsonwebtoken'

import { JSONType } from "@/data/model";

export class JwtAdapter {
  encrypt (payload: JSONType): void {
    const secretKey = process.env.SECRET_KEY!
    jsonwebtoken.sign(Buffer.from(JSON.stringify(payload)), secretKey)
  }
}