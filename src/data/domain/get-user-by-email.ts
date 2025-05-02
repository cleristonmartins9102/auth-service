import { UserModel } from "@/data/model";

export interface GetUserByEmail {
  getByEmail (email: string): Promise<UserModel | null>
}