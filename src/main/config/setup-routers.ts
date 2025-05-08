import { Express, Router } from 'express'
import { generateTokenRouter, validateTokenRouter } from '../routers'
import { authenticationRouter } from '../routers/authentication-router'

export const setupRouter = (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  generateTokenRouter(router)
  authenticationRouter(router)
  validateTokenRouter(router)
}