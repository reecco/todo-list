import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import randomstring from 'randomstring'
import dotenv from 'dotenv'

import UserModel from "../models/User.js"
import AdminModel from '../models/Admin.js'

dotenv.config()

export default class UserController {
  static async register(req, res) {
    let { username, email, password } = req.body

    if (!username || !email || !password) return res.status(400).json({ message: 'Sintaxe inválida', status: 400 })

    const hash = await bcrypt.hash(password, 10)

    const userId = randomstring.generate({ capitalization: 'lowercase', length: 20 })

    try {
      const isValid = await UserModel.find({ email })

      if (isValid.at()) return res.status(400).json({ message: 'E-mail já cadastrado.', status: 400 })

      const createdUser = await UserModel.create({ username, email, password: hash, userId })

      return res.status(200).json({ message: 'Usuário cadastrado com sucesso.', createdUser, status: 200 })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Ocorreu um erro ao cadastrar usuário.', status: 400 })
    }
  }

  static async login(req, res) {
    let { email, password } = req.body

    if (!email || !password) return res.status(400).json({ message: 'Sintaxe inválida', status: 400 })

    const secret = process.env.SECRET_JWT

    try {
      const user = await UserModel.find({ email })

      if (!user.at()) return res.status(401).json({ message: 'E-mail ou senha inválidos.', status: 401 })

      const isValidPassword = await bcrypt.compare(password, user[0].password)

      if (!isValidPassword) return res.status(401).json({ message: 'E-mail ou senha inválidos.', status: 401 })

      const token = jwt.sign({ id: user[0].id }, secret, { expiresIn: '1m' })

      req.session.userId = user[0].userId

      return res.status(200).json({ message: 'Credenciais válidas.', token, status: 200 })
      // return res.status(200).redirect('/home/' + user[0].userId)
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro', status: 400 })
    }
  }

  static async logout(req, res) {
    console.log(req.headers['authorization'])
    req.headers['authorization'] = ''
    console.log(req.headers['authorization'])

    return res.status(200).json({ message: 'Desconectado com sucesso.', status: 200 })
  }

  static async userList(req, res) {
    try {
      const users = await UserModel.find({}, {'password': 0})

      return res.status(200).json({ users, status: 200 })
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro.', status: 400 })
    }
  }

  static async user(req, res) {
    let { id } = req.params

    try {
      const user = await UserModel.findById(id, '-password')

      return res.send({ user })
    } catch (error) {

    }
  }

  static async deleteUser(req, res) {
    let { id } = req.body

    try {
      const deleted = await UserModel.findByIdAndDelete(id)

      if (deleted) return res.status(200).json({ message: 'Usuário excluido com sucesso.', status: 200 })

      return res.status(404).json({ message: 'Usuário não existe.', status: 404 })
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro.', status: 400 })
    }
  }

  static async updateUser(req, res) {
    let { id } = req.body

    try {
      await UserModel.findByIdAndUpdate(id, req.body)

      return res.status(200).json({ message: 'Alterações realizadas com sucesso.', status: 200 })
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro ao atualizar.', status: 400 })
    }
  }

  static async admin(req, res) {
    let { email, password } = req.body

    if (!email || !email) return res.status(400).json({ message: 'Sintaxe inválida.', status: 400 })

    const secret = process.env.SECRETADMIN

    try {
      const user = await AdminModel.find({ email })

      if (!user.at()) return res.status(401).json({ message: 'Credenciais inválidas.', status: 401 })

      const isValidPassword = await bcrypt.compare(password, user[0].password)

      if (!isValidPassword) return res.status(401).json({ message: 'Credenciais inválidas.', status: 401 })

      const token = jwt.sign({ id: user[0].id }, secret, { expiresIn: '2m' })

      // req.session.userId = user[0].id

      return res.status(200).json({ message: 'Credenciais válidas.', token, status: 200 })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Ocorreu um erro ao cadastrar usuário.', status: 400 })
    }
  }
}