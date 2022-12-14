import mongoose from 'mongoose'

const { Schema } = mongoose

const TaskSchema = new Schema({
  userId: String,
  title: String,
  dateCreated: Date,
  description: String,
  topic: String,
  check: Boolean
})

const TaskModel = mongoose.model('tasks', TaskSchema)

export default TaskModel