import User from '../models/User'
import Controller from './Controller'
import message from '../messages'
import { UserCreateSchema, UserUpdateSchema } from '../validations/UserValidation'

class UserController extends Controller {
    async index (req, res) {
        const users = await User.findAllValues()

        return res.json(users.get(['id', 'name', 'email', 'provider']))
    }

    async store (req, res) {
        // Validate received data
        if (!await UserCreateSchema.isValid(req.body)) {
            return res.json({ error: message('validation-fails') })
        }

        const emailExists = await User.hasEmail(req.body.email)

        if (emailExists) {
            return res.status(400).json({ error: message('email-used') })
        }

        const { id, name, email, provider } = await User.create(req.body)

        return res.json({ id, name, email, provider })
    }

    async update (req, res) {
        const { email, password, oldPassword, confirmPassword } = req.body

        if (!await UserUpdateSchema.isValid(req.body)) {
            return res.json({ error: message('validation-fails') })
        }

        const user = await User.findByPk(req.userId)

        if (!user) {
            return res.json({ error: message('user-not-exists') })
        }

        // Trying to change email
        if (email && email !== user.email) {
            const emailExists = await User.hasEmail(req.body.email)

            if (emailExists) {
                return res.status(400).json({ error: message('email-used') })
            }
        }

        if (!oldPassword && (password || confirmPassword)) {
            return res.status(400).json({ error: message('password-required') })
        }

        if (oldPassword && !await user.checkPassword(oldPassword)) {
            return res.status(400).json({ error: message('wrong-credentials') })
        }

        const { id, name, email: dbEmail, provider } = await user.update(req.body)

        return res.json({ id, name, email: dbEmail, provider })
    }
}

export default new UserController()
