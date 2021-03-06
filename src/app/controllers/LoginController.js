import jwt from 'jsonwebtoken'
import User from '../models/User'
import message from '../messages'
import authConfig from '../../config/auth'
import { LoginSchema } from '../validations/LoginValidation'

class LoginController {
    async store (req, res) {
        const { email, password } = req.body

        // Validate received data
        if (!await LoginSchema.isValid(req.body)) {
            return res.status(400).json({ error: message('validation-fails') })
        }

        const user = await User.findOne({ where: { email } })

        // User does not exists
        if (!user) {
            return res.status(400).json({ error: message('wrong-credentials') })
        }

        // Password does not matchs
        if (!await user.checkPassword(password)) {
            return res.status(400).json({ error: message('wrong-credentials') })
        }

        const { id, name } = user

        return res.json({
            user: { id, name, email },
            token: jwt.sign({ id }, authConfig.secret, { expiresIn: authConfig.expiresIn }),
        })
    }
}

export default new LoginController()
