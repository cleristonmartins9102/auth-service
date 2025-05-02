import bcrypt from 'bcrypt'

import { Hash } from "@/data/domain";

export class BcryptAdapter implements Hash {
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 10)
  }
}