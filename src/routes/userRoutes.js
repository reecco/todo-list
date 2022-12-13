import { Router } from 'express'

import UserController from '../controllers/UserController.js'

const router = Router()

router
  .post('/signup', UserController.register)
  .post('/signin', UserController.login)
  .get('/users', UserController.userList)
  .delete('/', UserController.deleteUser)

export default router