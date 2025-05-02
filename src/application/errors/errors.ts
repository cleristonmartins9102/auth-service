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