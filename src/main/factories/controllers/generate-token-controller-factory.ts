import { Controller } from "@/application/contracts/controller";
import { GenerateTokenController } from "@/application/controllers";
import { JwtAdapter } from "@/infra/adapters";

export const generateTokenControllerFactory = (): Controller => {
  const jwtAdapter = new JwtAdapter()
  return new GenerateTokenController(jwtAdapter)
}