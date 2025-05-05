import { Controller } from "@/application/contracts/controller";
import { CreateCredentialController } from "@/application/controllers";
import { dbCreateCredentialFactory } from "../features/db-create-credential-factory";

export const generateTokenControllerFactory = (): Controller => {
  const dbCreateCredential = dbCreateCredentialFactory()
  return new CreateCredentialController(dbCreateCredential)
}