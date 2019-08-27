import Sequelize from 'sequelize'
import BaseModel from './BaseModel'

class Appointment extends BaseModel {
    static init (sequelize) {
        super.init(
            {
            // Attributes
                date: Sequelize.DATE,
                canceled_at: Sequelize.DATE,
                // user
                // provider
            //
            },
            { sequelize },
        )

        return this
    }

    static associate (models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
        this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' })
    }
}

export default Appointment
