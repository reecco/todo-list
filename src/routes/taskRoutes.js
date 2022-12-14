import { Router } from 'express'

import TaskController from '../controllers/TaskController.js'

const router = Router()

router
  .post('/newtask', TaskController.newTask)
  .get('/home/:id', TaskController.tasks)
  .get('/task/list/:id', TaskController.fullTaskList)
  .delete('/task', TaskController.removeTask)

export default router