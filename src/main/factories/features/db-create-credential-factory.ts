import { CreateCredential } from "@/data/domain";
import { DbCreateCredential } from "@/data/features";
import { BcryptAdapter, JwtAdapter } from "@/infra/adapters";
import { FsCredentialRepository } from "@/infra/repository/fs-credential-repository";

export const dbCreateCredentialFactory = (): CreateCredential => {
  const jwtAdapter = new JwtAdapter()
  const bcrypterAdapter = new BcryptAdapter()
  const fsCredentialRepository = new FsCredentialRepository()
  return new DbCreateCredential(jwtAdapter, bcrypterAdapter, fsCredentialRepository)
}