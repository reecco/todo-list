import TaskModel from '../models/Task.js'
import UserModel from "../models/User.js"

export default class TaskController {
  static async tasksList(req, res) {
    let { id } = req.params

    try {
      const datas = await TaskModel.find({ userId: id })

      return res.status(200).json({ tasks: datas, status: 200 })
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro.', status: 400 })
    }
  }

  static async tasks(req, res) {
    let id = req.session.userId

    try {
      const datas = await UserTasksModel.findById(id)

      return res.status(200).json({ tasks: datas.tasks, status: 200 })
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro.', status: 400 })
    }
  }

  static async removeTask(req, res) {
    let { id, idTask } = req.body

    try {
      const usersTasks = await UserTasksModel.findById(id)
      console.log(usersTasks.id)
      await UserTasksModel.deleteOne({ id: usersTasks.id, 'tasks.id': idTask })
      return res.status(200).json({ message: 'Tarefa excluida com sucesso.', status: 200 })
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro ao excluir a tarefa.', status: 400 })
    }
  }

  static async newTask(req, res) {
    let { id, title, description } = req.body

    try {
      const user = await UserModel.findById(id)

      console.log(user.id)
      await TaskModel.create({ userId: user.id, title, description })

      return res.status(200).json({ message: 'Tarefa adicionada com sucesso.', status: 200 })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Ocorreu um erro ao adicionar a tarefa.', status: 400 })
    }
  }
}