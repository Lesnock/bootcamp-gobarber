import Sequelize from 'sequelize'
import databaseConfig from '../config/database'

// Models
import User from '../app/models/User'

// Models registering
const models = [
    User,
]

class Database {
    constructor () {
        this.init()
    }

    init () {
        this.connection = new Sequelize(databaseConfig)

        models.forEach((model) => model.init(this.connection))
    }
}

export default new Database()
