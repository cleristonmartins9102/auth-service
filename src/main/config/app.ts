import express, { json, Express } from 'express'
import { setupRouter } from './setup-routers'

export const createApp = (): Express => {
  const app = express()
  app.use(json())
  setupRouter(app)
  return app
}