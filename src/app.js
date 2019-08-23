import express from 'express'
import { Public, Private } from './routes'

import './database'

class App {
    constructor ()
    {
        this.server = express()

        this.middlewares()
        this.routes()
    }

    routes () 
    {
        this.server.use(Public)
        this.server.use(Private)
    }

    middlewares () 
    {
        this.server.use(express.json())
    }
}

export default new App().server