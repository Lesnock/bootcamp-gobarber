import { Op } from 'sequelize'
import message from '../messages'
import User from '../models/User'
import Appointment from '../models/Appointment'
import { startOfDay, endOfDay, isAfter, isValid, format, setHours, setMinutes, setSeconds } from 'date-fns'

class AvailableController {
    async index (req, res) {
        const { provider_id } = req.params

        // Verify if is a provider
        if (!User.isProvider(provider_id)) {
            return res.json({ error: message('list-appointment-for-no-provider') })
        }

        const { date } = req.query

        if (!date) {
            return res.json({ error: message('invalid-date') })
        }

        const nDate = Number(date)

        if (!isValid(nDate)) {
            return res.json({ error: message('invalid-date') })
        }

        // Get NOT available appointments
        const appointments = await Appointment.findAll({
            where: {
                provider_id,
                canceled_at: null,
                date: { [Op.between]: [startOfDay(nDate), endOfDay(nDate)] },
            },
        })

        const schedule = Appointment.hourly()

        // Set the schedule to nDate
        const formatedSchedule = schedule.map(time => {
            const [hour, minute] = time.split(':')
            const timeWithDate = setSeconds(setMinutes(setHours(nDate, hour), minute), 0)

            return {
                time,
                formated: format(timeWithDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
                available:
                    isAfter(timeWithDate, new Date())
                    && !appointments.find(appointment => format(appointment.date, 'HH:mm') === time),
            }
        })

        return res.json(formatedSchedule)
    }
}

export default new AvailableController()
