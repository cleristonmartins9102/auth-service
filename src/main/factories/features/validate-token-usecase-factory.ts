import { ValidateToken } from "@/data/domain";
import { ValidateTokenUsecase } from "@/data/features/validate-token-usecase";
import { JwtAdapter } from "@/infra/adapters";
import { refreshTokenUsecaseFactory } from "./refresh-token-usecase-factory"

export const validateTokenUsecaseFactory = (): ValidateToken => {
  const jwtAdapter = new JwtAdapter()
  const refreshTokenUsecase = refreshTokenUsecaseFactory()
  return new ValidateTokenUsecase(jwtAdapter, refreshTokenUsecase)
}