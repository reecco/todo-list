import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export default (req, res, next) => {
  const secret = process.env.SECRET_JWT
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Acesso não autorizado.', status: 401 })

  try {
    jwt.verify(token, secret)

    next()
  } catch (error) {
    res.status(400).json({ message: 'Token inválido', status: 400 })
  }
}