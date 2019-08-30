import express, { Router } from 'express'
import { UPLOADS_PATH } from './util/path'

// Middlewares
import authMiddleware from './app/middlewares/auth'
import { single } from './app/middlewares/upload'

// Controllers
import UserController from './app/controllers/UserController'
import ImageController from './app/controllers/ImageController'
import LoginController from './app/controllers/LoginController'
import ProviderController from './app/controllers/ProviderController'
import ScheduleController from './app/controllers/ScheduleController'
import AvailableController from './app/controllers/AvailableController'
import AppointmentController from './app/controllers/AppointmentController'
import NotificationController from './app/controllers/NotificationController'

// Public routes
export const Public = new Router()
Public.get('/users', UserController.index)
Public.post('/users', UserController.store)
Public.post('/login', LoginController.store)
Public.use('/files', express.static(UPLOADS_PATH))

// Private routes
export const Private = new Router()
Private.use(authMiddleware)

Private.put('/users', UserController.update)

Private.get('/appointments', AppointmentController.index)
Private.post('/appointments', AppointmentController.store)
Private.delete('/appointments/:id', AppointmentController.delete)
Private.get('/appointments/:provider_id/available', AvailableController.index)

Private.get('/notifications', NotificationController.index)
Private.put('/notifications/:id', NotificationController.update)

Private.get('/schedule', ScheduleController.index)

Private.get('/providers', ProviderController.index)
Private.post('/files', single('file'), ImageController.store)
