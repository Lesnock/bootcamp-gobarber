import multer from 'multer'
import crypto from 'crypto'
import message from '../app/messages'
import { extname, resolve } from 'path'

const storage = {}

// Path to upload
storage.destination = resolve(__dirname, '..', '..', 'tmp', 'uploads')

// Filename will be in hexadecimal
storage.filename = (req, file, cb) => {
    crypto.randomBytes(16, (err, res) => {
        if (err) cb(err)

        const name = res.toString('hex') + extname(file.originalname)
        return cb(null, name)
    })
}

export default { storage: multer.diskStorage(storage) }
