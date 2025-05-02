import { expressAdapter } from "@/infra/adapters/express-adapter";
import { Router } from "express";
import { generateTokenControllerFactory } from "../factories";

export const generateTokenRouter = (router: Router): void => {
  router.post('/token', expressAdapter(generateTokenControllerFactory()))
}