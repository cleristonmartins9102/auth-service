import bcrypt from 'bcrypt'

import { Compare, Hash } from "@/data/domain";

export class BcryptAdapter implements Hash, Compare {
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 10)
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}