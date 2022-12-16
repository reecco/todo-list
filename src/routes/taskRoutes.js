import { Router } from 'express'

import TaskController from '../controllers/TaskController.js'
import auth from '../middlewares/auth.js'
// import admin from '../middlewares/admin.js'

const router = Router()

router
  .post('/newtask', auth, TaskController.newTask)
  .get('/home/:id', auth, TaskController.tasks)
  .delete('/task', auth, TaskController.deleteTask)
  .put('/task', auth, TaskController.updateTask)

export default router