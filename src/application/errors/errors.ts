export class NoSecretFoundError extends Error {
  constructor () {
    super('Not found secret key')
    this.name = 'NoSecretFoundError'
  }
}

export class JwtAdapterError extends Error {
  constructor (error: Error) {
    super(error.message)
    this.name = 'JwtAdapterError'
  }
}
export class UserNotFoundError extends Error {
  constructor (fieldName: string, value: string) {
    super(`User not found with ${fieldName} ${value}`)
    this.name = 'UserNotFoundError'
  }
}
export class WrongPasswordError extends Error {
  constructor () {
    super(`Wrong password!`)
    this.name = 'WrongPasswordError'
  }
}