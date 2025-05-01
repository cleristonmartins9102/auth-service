import bcrypt from 'bcrypt'

import { Hash } from "@/data/domain";

export class BcryptAdapter implements Hash {
  hash(value: string): string {
    const hashValue = bcrypt.hash(value, 10)
    return ''
  }
}