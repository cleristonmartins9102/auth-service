import { Encrypt } from "../domain";
import { CreateCredentialModel, UserModel } from "../model";

export class CreateCredentialUsecase {
  constructor (
    private readonly jwtAdapter: Encrypt<UserModel>
  ) {}
  async create (userModel: UserModel): Promise<void> {
    this.jwtAdapter.encrypt(userModel)
  }
}