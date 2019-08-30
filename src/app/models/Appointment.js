import User from './User'
import File from './File'
import Sequelize, { Op } from 'sequelize'
import BaseModel from './BaseModel'
import { parseISO, startOfDay, endOfDay, isBefore, subHours } from 'date-fns'

const pagination = 20

class Appointment extends BaseModel {
    static init (sequelize) {
        super.init(
            {
            // Attributes
                date: Sequelize.DATE,
                canceled_at: Sequelize.DATE,
                past: {
                    type: Sequelize.VIRTUAL,
                    get () {
                        return isBefore(this.date, new Date())
                    },
                },
                cancelable: {
                    type: Sequelize.VIRTUAL,
                    get () {
                        return isBefore(new Date(), subHours(this.date, 2))
                    },
                },
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
            attributes: ['id', 'date', 'user_id', 'past', 'cancelable'],
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

    // Get available hours to work
    static hourly () {
        return [
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
        ]
    }
}

export default Appointment
