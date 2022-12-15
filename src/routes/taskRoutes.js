import { Router } from 'express'

import TaskController from '../controllers/TaskController.js'
import auth from '../middlewares/auth.js'

const router = Router()

router
  .post('/newtask', TaskController.newTask)
  .get('/home/:id', auth, TaskController.tasks)
  .get('/task/list/:id', auth, TaskController.fullTaskList)
  .delete('/task', auth, TaskController.removeTask)

export default router