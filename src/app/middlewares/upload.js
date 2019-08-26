import multer from 'multer'
import multerConfig from '../../config/multer'

const upload = multer(multerConfig)

export const single = (field) => upload.single(field)
