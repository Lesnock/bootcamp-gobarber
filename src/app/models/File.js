import Sequelize from 'sequelize'
import BaseModel from './BaseModel'

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
                        return `${process.env.APP_URL}files/${this.path}`
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
