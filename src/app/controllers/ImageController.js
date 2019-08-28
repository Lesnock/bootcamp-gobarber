import message from '../messages'
import File from '../models/File'
import { unlink } from '../../util/fs'
import { saveTemp } from '../../util/image'
import { StoreImageSchema } from '../validations/ImageValidation'

class ImageController {
    async store (req, res) {
        if (!await StoreImageSchema.isValid(req.file)) {
            await unlink(req.file.path)
            return res.status(400).json({ error: message('invalid-mime') })
        }

        await saveTemp(req.file.path, req.file.filename)

        const { originalname: name, filename: path } = req.file

        await unlink(req.file.path)

        const file = await File.create({ name, path })

        return res.json(file)
    }
}

export default new ImageController()
