import { Auth } from "@/data/domain";
import { AuthenticationUsecase, RefreshTokenUsecase } from "@/data/features";
import { BcryptAdapter, JwtAdapter } from "@/infra/adapters";
import { FsCredentialRepository } from "@/infra/repository/fs-credential-repository";

export const authenticationUsecaseFactory = (): Auth => {
  const fsCredentialRepository = new FsCredentialRepository()
  const bcryptAdapter = new BcryptAdapter()
  const jwtAdapter = new JwtAdapter()
  const refreshTokenUsecase = new RefreshTokenUsecase(fsCredentialRepository, jwtAdapter)
  const authenticationUsecase = new AuthenticationUsecase(fsCredentialRepository, bcryptAdapter, jwtAdapter, refreshTokenUsecase)
  return authenticationUsecase
}