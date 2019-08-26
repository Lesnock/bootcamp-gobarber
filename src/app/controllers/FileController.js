import Controller from './Controller'

class FileController extends Controller {
    async store (req, res) {
        if (req.filterError) {
            return res.json({ error: req.filterError })
        }

        return res.json(req.file)
    }
}

export default new FileController()
