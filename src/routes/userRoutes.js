import { Router } from 'express'
import bcrypt from 'bcrypt'

import UserController from '../controllers/UserController.js'

const router = Router()

router
  .post('/signup', UserController.register)
  .post('/signin', UserController.login)
  .get('/users', UserController.userList)
  .get('/home', UserController.tasks)
  .delete('/', UserController.deleteUser)

export default router