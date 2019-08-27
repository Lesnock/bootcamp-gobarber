import sharp from 'sharp'
import { UPLOADS_PATH } from './path'

// Move from temp to images folder
export function saveTemp (path, filename) {
    return sharp(path)
        .jpeg({ quality: 80 })
        .toFile(UPLOADS_PATH + filename)
}
