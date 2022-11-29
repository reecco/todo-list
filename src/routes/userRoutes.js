import { Router } from 'express'
import bcrypt from 'bcrypt'

import UserController from '../controllers/UserController.js'

const router = Router()

router.post('/signup', UserController.register)
router.get('/users', UserController.userList)

const defaultPassword = bcrypt.hashSync('teste123', 10)

const teste = 'blalbsaiudadagshda'

router.get('/home', (req, res) => {
  let message = req.session.message
  console.log('Entrou na rota Home')
  console.log(message)
  res.status(200).json({ message: message, status: 200 })
})

router.post('/', (req, res) => {
  let { password } = req.body

  const hash = bcrypt.compareSync(password, defaultPassword)

  req.session.message = hash

  res.redirect('/home')
})

export default router