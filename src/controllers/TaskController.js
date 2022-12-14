import TaskModel from '../models/Task.js'
import UserModel from "../models/User.js"

export default class TaskController {
  static async fullTaskList(req, res) {
    let { id } = req.params

    try {
      const datas = await TaskModel.find({ userId: id })

      return res.status(200).json({ tasks: datas, status: 200 })
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro.', status: 400 })
    }
  }

  static async tasks(req, res) {
    // let id = req.session.userId
    let userId = req.params.id

    try {
      const datas = await TaskModel.find({ userId })

      return res.status(200).json({ tasks: datas, status: 200 })
    } catch (error) {
      return res.status(400).json({ message: 'Ocorreu um erro.', status: 400 })
    }
  }

  static async removeTask(req, res) {
    let { id, taskId } = req.body

    await UserModel.findById(id).then(async (datas) => {
      return await TaskModel.find({ userId: datas.id })
    }).catch(error => {
      return res.status(400).json({ message: 'Usuário não encontrado.', status: 404 })
    })

    await TaskModel.findByIdAndDelete(taskId).then((task) => {
      console.log(task)
      if (task === null) {
        return res.status(404).json({ message: 'Tarefa não encontrada.', status: 404 })
      }

      return res.status(200).json({ message: 'Tarefa excluida com sucesso.', status: 200 })
    }).catch(() => {
      return res.status(400).json({ message: 'Ocorreu um erro ao excluir a tarefa.', status: 400 })
    })
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