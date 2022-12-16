import mongoose from 'mongoose'

const { Schema } = mongoose

const AdminSchema = new Schema({
  username: String,
  email: String,
  password: String
})

const AdminModel = mongoose.model('admins', AdminSchema)

export default AdminModel