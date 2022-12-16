import TaskModel from '../models/Task.js'
import UserModel from "../models/User.js"

export default class TaskController {
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

  static async deleteTask(req, res) {
    let id = req.body.taskId

    await TaskModel.findByIdAndDelete(id).then((task) => {
      if (task === null) {
        return res.status(404).json({ message: 'Tarefa não encontrada.', status: 404 })
      }

      return res.status(200).json({ message: 'Tarefa excluida com sucesso.', status: 200 })
    }).catch(() => {
      return res.status(403).json({ message: 'Ocorreu um erro ao excluir a tarefa.', status: 403 })
    })
  }

  static async newTask(req, res) {
    let { id, title, description } = req.body

    if (!id || !title || !description) return res.status(400).json({ message: 'Verifique os campos vazios.', status: 400 })

    try {
      const user = await UserModel.findById(id)

      const dateCreated = new Date()

      console.log(user.id)
      await TaskModel.create({ userId: user.id, title, dateCreated, description })

      return res.status(200).json({ message: 'Tarefa adicionada com sucesso.', status: 200 })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Ocorreu um erro ao adicionar a tarefa.', status: 400 })
    }
  }

  static async updateTask(req, res) {
    let { id } = req.body

    await TaskModel.findByIdAndUpdate(id, req.body).then(task => {
      if (task === null) return res.status(404).json({ message: 'Tarefa não encontrada.', status: 404 })

      return res.status(200).json({ message: 'Tarefa atualizada com sucesso.', status: 200 })
    }).catch(error => {
      return res.status(400).json({ message: 'Ocorreu ao atualizar tarefa.', status: 400 })
    })
  }
}