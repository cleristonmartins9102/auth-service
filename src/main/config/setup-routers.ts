import { Express, Router } from 'express'
import { generateTokenRouter } from '../routers'

export const setupRouter = (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  generateTokenRouter(router)
}