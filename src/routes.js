import { Router } from 'express'
import authMiddleware from './app/middlewares/auth'

// Controllers
import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'

// Public routes
export const Public = new Router()
Public.get('/users', UserController.index)
Public.post('/users', UserController.store)
Public.post('/login', LoginController.store)

// Private routes
export const Private = new Router()
Private.use(authMiddleware)
Private.put('/users', UserController.update)
