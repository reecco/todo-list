import express from 'express'
import dotenv from 'dotenv'

import routes from './src/routes/index.js'
import connection from './src/db/connection.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 9000

connection()

routes(app)

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))