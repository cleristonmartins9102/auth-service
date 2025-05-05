import { Controller } from "@/application/contracts/controller"
import { AuthenticationController } from "@/application/controllers/authentication-controller"
import { authenticationUsecaseFactory } from "../features/authentication-usecase-factory"

export const authenticationControllerFactory = (): Controller => {
  const authenticationUsecase = authenticationUsecaseFactory()
  return new AuthenticationController(authenticationUsecase)
}