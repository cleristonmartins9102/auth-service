export class CreateUserModel {
  name!: string
  countryDialCode!: string
  phoneNumber!: string
  email!: string
  password!: string
}

export class CreateUserRepositoryModel extends CreateUserModel {
  token!: string
  refreshToken!: string
  password!: string
}

export class UserModel extends CreateUserRepositoryModel {
  id!: number
  created_at!: Date
}