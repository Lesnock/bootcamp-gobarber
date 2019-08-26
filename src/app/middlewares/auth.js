import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import User from '../models/User'
import authConfig from '../../config/auth'
import { message } from '../messages/index'

export default async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) { return res.json({ error: message('token-not-provided') }) }

    const [, token] = authHeader.split(' ')

    // Create token verify function promisified
    const tokenVerify = promisify(jwt.verify)

    try {
        const decoded = await tokenVerify(token, authConfig.secret)
        req.userId = decoded.id
    } catch (error) {
        res.json({ error: message('token-invalid') })
    }

    const user = User.findByPk(req.userId)

    if (!user) {
        res.status(401).json({ error: message('user-not-exists') })
    }

    return next()
}
