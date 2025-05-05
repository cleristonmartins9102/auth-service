import { RefreshToken } from "@/data/domain";
import { RefreshTokenUsecase } from "@/data/features";
import { JwtAdapter } from "@/infra/adapters";
import { FsCredentialRepository } from "@/infra/repository/fs-credential-repository";

export const refreshTokenUsecaseFactory = (): RefreshToken => {
  const fsCredentialRepository = new FsCredentialRepository()
  const jwtAdapter = new JwtAdapter()
  return new RefreshTokenUsecase(fsCredentialRepository, jwtAdapter)
}