import express, { json } from 'express'
import { setupRouter } from './setup-routers'

export const createApp = (): any => {
  const app = express()
  app.use(json())
  setupRouter(app)
  return app
}