import Sequelize from 'sequelize'
import Collection from '../../collection'

class BaseModel extends Sequelize.Model
{
    static async findAllValues () 
    {
        const results = await this.findAll()

        const values = []
        results.forEach(model => values.push(model.dataValues))

        return new Collection(values)
    }
}

export default BaseModel