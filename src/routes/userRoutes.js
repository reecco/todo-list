import { Router } from 'express'

import UserController from '../controllers/UserController.js'
import auth from '../middlewares/auth.js'
import admin from '../middlewares/admin.js'

const router = Router()

router
  .post('/register', UserController.register)
  .post('/login', UserController.login)
  .get('/admin/users', admin, UserController.userList)
  .get('/logout', UserController.logout)
  .get('/user/:id', auth, UserController.user)
  .delete('/', auth, UserController.deleteUser)
  .put('/', auth, UserController.updateUser)
  .post('/admin/login', UserController.admin)

export default router