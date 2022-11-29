import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connection = process.env.CONNECTION

async function connectionDB() {
  await mongoose.connect(`${connection}`)
}

export default () => {
  connectionDB()
  console.log('Connected to database.')
}