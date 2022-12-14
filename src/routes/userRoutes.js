import { Router } from 'express'

import UserController from '../controllers/UserController.js'
import auth from '../middlewares/auth.js'

const router = Router()

router
  .post('/register', UserController.register)
  .post('/login', UserController.login)
  .get('/users', auth, UserController.userList)
  .get('/user/:id', auth, UserController.user)
  .delete('/', UserController.deleteUser)

export default router