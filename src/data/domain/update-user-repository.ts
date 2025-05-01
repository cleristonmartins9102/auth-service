import { UserModel } from "@/data/model";

export interface UpdateUserRepository {
  update (params: UpdateUserRepository.Params): Promise<UserModel>
}

export namespace UpdateUserRepository {
  export type Params = {
    id: number
  } & Partial<UserModel>
}