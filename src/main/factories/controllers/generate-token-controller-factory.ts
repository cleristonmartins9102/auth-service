import { Controller } from "@/application/contracts/controller";
import { GenerateTokenController } from "@/application/controllers";
import { dbCreateCredentialFactory } from "../features/db-create-credential-factory";

export const generateTokenControllerFactory = (): Controller => {
  const dbCreateCredential = dbCreateCredentialFactory()
  return new GenerateTokenController(dbCreateCredential)
}