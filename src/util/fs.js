import fs from 'fs'
import { promisify } from 'util'

export const unlink = promisify(fs.unlink)
