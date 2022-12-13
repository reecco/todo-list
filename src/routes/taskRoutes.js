import { Router } from 'express'

import TaskController from '../controllers/TaskController.js'

const router = Router()

router
  .post('/newtask', TaskController.newTask)
  .get('/home', TaskController.tasks)
  .get('/listtasks/:id', TaskController.tasksList)
  .delete('/task', TaskController.removeTask)

export default router