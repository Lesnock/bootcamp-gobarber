import Sequelize from 'sequelize'
import BaseModel from './BaseModel'
import { development } from '../../config/server'

class File extends BaseModel {
    static init (sequelize) {
        super.init(
            {
            // Attributes
                name: Sequelize.STRING,
                path: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get () {
                        return `${development.base_url}files/${this.path}`
                    },
                },
            //
            },
            { sequelize },
        )

        return this
    }
}

export default File
