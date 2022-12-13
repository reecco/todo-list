import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function connectionDB() {
  const connection = process.env.CONNECTION

  return await mongoose.connect(connection)
    .then((res) => 'Connected to database.')
    .catch((error) => 'Database connection error.')
}

export default async () => {
  console.log(await connectionDB())
}