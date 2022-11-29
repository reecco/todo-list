import mongoose from 'mongoose'

const { Schema } = mongoose

const UserTasksSchema = new Schema({
  username: String,
  email: String,
  password: String,
  tasks: [
    {
      id: String,
      title: String,
      // createdData: Date
      description: String,
      topic: String,
      check: Boolean
    }
  ]
})

const UserTasksModel = mongoose.model('todolists', UserTasksSchema)

export default UserTasksModel