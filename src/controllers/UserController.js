import bcrypt from 'bcrypt'
import randomstring from 'randomstring'

import UserModel from "../models/User.js"

export default class UserController {
  static async register(req, res) {
    let { username, email, password } = req.body

    const hash = await bcrypt.hash(password, 10)

    try {
      const isValid = await UserModel.find({ email })

      if (isValid.at()) return res.status(400).json({ message: 'E-mail já cadastrado.', status: 400 })

      const createdUser = await UserModel.create({ username, email, password: hash })

      return res.status(200).json({ message: 'Usuário cadastrado com sucesso.', createdUser, status: 200 })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Ocorreu um erro ao cadastrar usuário.', status: 400 })
    }
  }

  static async login(req, res) {
    let { email, password } = req.body

    try {
      const user = await UserTasksModel.find({ email })

      if (!user.at()) return res.status(401).json({ message: 'E-mail ou senha inválidos.', status: 401 })

      const isValidPassword = await bcrypt.compare(password, user[0].password)

      if (!isValidPassword) return res.status(401).json({ message: 'E-mail ou senha inválidos.', status: 401 })

      req.session.userId = user[0].id

      // return res.status(200).json({ message: 'Credenciais válidas.', status: 200 })
      return res.status(200).redirect('/home')
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro', status: 400 })
    }
  }

  static async userList(req, res) {
    try {
      const users = await UserModel.find()

      return res.status(200).json({ users, status: 200 })
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro.', status: 400 })
    }
  }

  static async deleteUser(req, res) {
    let { id } = req.body

    try {
      const deleted = await UserTasksModel.findByIdAndDelete(id)

      if (deleted) return res.status(200).json({ message: 'Usuário excluido com sucesso.', status: 200 })

      return res.status(404).json({ message: 'Usuário não existe.', status: 404 })
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro.', status: 400 })
    }
  }

  static async updateUser(req, res) {
    let { id } = req.body

    try {
      await UserTasksModel.findByIdAndUpdate(id, req.body)

      return res.status(200).json({ message: 'Alterações realizadas com sucesso.', status: 200 })
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro ao atualizar.', status: 400 })
    }
  }
}