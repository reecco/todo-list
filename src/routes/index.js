import express from "express"
import session from 'express-session'

import user from './userRoutes.js'
import task from './taskRoutes.js'

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).json({ message: 'Welcome to To-Do List', status: 200 })
  })

  app.use(
    express.json(),
    session({ secret: 'teste', resave: false, saveUninitialized: false }),
    user,
    task
  )
}

export default routes