import User from './User'
import File from './File'
import Sequelize, { Op } from 'sequelize'
import BaseModel from './BaseModel'
import { parseISO, startOfDay, endOfDay } from 'date-fns'

const pagination = 20

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

    // Get all appointments that are not canceled
    static getEnables (userId, page = 1) {
        return Appointment.findAll({
            where: { user_id: userId, canceled_at: null },
            order: [['date', 'desc']],
            attributes: ['id', 'date', 'user_id'],
            limit: pagination,
            offset: (page - 1) * pagination,
            include: [{
                model: User,
                as: 'provider',
                attributes: [
                    'id', 'name', 'email',
                ],
                include: [{
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'url', 'path'],
                }],
            }],
        })
    }

    // Get all appointments of a date
    static findAllByDate (providerId, date) {
        const parsedDate = parseISO(date)
        return Appointment.findAll({
            where: {
                provider_id: providerId,
                canceled_at: null,
                date: {
                    [Op.between]: [
                        startOfDay(parsedDate),
                        endOfDay(parsedDate),
                    ],
                },
            },
        })
    }

    // Check if provider is available at hour
    static async isAvailable (providerId, hour) {
        return !await Appointment.findOne({
            where: {
                provider_id: providerId,
                canceled_at: null,
                date: hour,
            },
        })
    }
}

export default Appointment
