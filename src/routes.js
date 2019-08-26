import { Router } from 'express'

// Middlewares
import authMiddleware from './app/middlewares/auth'
import { single } from './app/middlewares/upload'

// Controllers
import UserController from './app/controllers/UserController'
import FileController from './app/controllers/FileController'
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

Private.post('/files', single('file'), FileController.store)
