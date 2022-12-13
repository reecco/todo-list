import { Router } from 'express'

import UserController from '../controllers/UserController.js'

const router = Router()

router
  .post('/signup', UserController.register)
  .post('/signin', UserController.login)
  .post('/newtask', UserController.newTask)
  .get('/users', UserController.userList)
  .get('/home', UserController.tasks)
  .delete('/', UserController.deleteUser)
  .delete('/task', UserController.removeTask)

export default router