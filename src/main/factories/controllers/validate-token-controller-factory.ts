import { Controller } from "@/application/contracts/controller";
import { ValidateTokenController } from "@/application/controllers/validate-token-controller";
import { validateTokenUsecaseFactory } from "../features/validate-token-usecase-factory";

export const validateTokenControllerFactory = (): Controller => {
  return new ValidateTokenController(validateTokenUsecaseFactory())
}