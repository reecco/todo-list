import bcrypt from 'bcrypt'

import UserTasksModel from "../models/UserTasks.js"

export default class UserController {
  static async register(req, res) {
    let { username, email, password } = req.body

    const hash = await bcrypt.hash(password, 10)

    try {
      const isValid = await UserTasksModel.find({ email })

      if (isValid.at()) return res.status(400).json({ message: 'E-mail já cadastrado.', status: 400 })

      const createdUser = await UserTasksModel.create({ username, email, password: hash })

      return res.status(200).json({ message: 'Usuário cadastrado com sucesso.', createdUser, status: 200 })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Ocorreu um erro.', status: 400 })
    }
  }

  static async userList(req, res) {
    try {
      const list = await UserTasksModel.find()

      return res.status(200).json({ list, status: 200 })
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro.', status: 400 })
    }
  }
}