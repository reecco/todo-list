import express from "express"
import session from 'express-session'
import dotenv from 'dotenv'

import user from './userRoutes.js'
import task from './taskRoutes.js'

dotenv.config()

const routes = (app) => {
  const secret = process.env.SECRET_SESSION

  app.route('/').get((req, res) => {
    res.status(200).json({ message: 'Welcome to the To-Do List', status: 200 })
  })

  app.use(
    express.json(),
    session({ secret: secret, resave: false, saveUninitialized: false }),
    user,
    task
  )
}

export default routes