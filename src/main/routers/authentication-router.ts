import { expressAdapter } from "@/infra/adapters/express-adapter";
import { Router } from "express";
import { authenticationControllerFactory } from "../factories/controllers/authentication-controller-factory"

export const authenticationRouter = (router: Router): void => {
  router.post('/auth', expressAdapter(authenticationControllerFactory()))
}