import User from '../models/User'
import File from '../models/File'
import Controller from './Controller'

class ProviderController extends Controller {
    async index (req, res) {
        const providers = await User.findAll({
            where: { provider: true },
            attributes: ['id', 'name', 'email', 'avatar_id'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url'],
                },
            ],
        })

        return res.json(providers)
    }
}

export default new ProviderController()
