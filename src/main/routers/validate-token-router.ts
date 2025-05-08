import { expressAdapter } from "@/infra/adapters/express-adapter";
import { Router } from "express";
import { validateTokenControllerFactory } from "../factories/controllers/validate-token-controller-factory"

export const validateTokenRouter = (router: Router): void => {
  router.post('/auth/validate', expressAdapter(validateTokenControllerFactory()))
}