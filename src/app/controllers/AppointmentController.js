import message from '../messages'
import User from '../models/User'
import File from '../models/File'
import { startOfHour, parseISO, isBefore } from 'date-fns'
import Appointment from '../models/Appointment'
import { AppointmentCreateSchema } from '../validations/AppointmentValidation'

class AppointmentController {
    async index (req, res) {
        // Get all appointments that are not canceled
        const appointments = await Appointment.getEnables(req.userId, req.query.page)

        return res.json(appointments)
    }

    async store (req, res) {
        if (!await AppointmentCreateSchema.isValid(req.body)) {
            return res.status(400).json({ error: message('validation-fails') })
        }

        const { provider_id, date } = req.body

        // Check if user is really a provider or exists
        if (!await User.isProvider(provider_id)) {
            return res.status(401).json({ error: message('create-appointment-for-no-provider') })
        }

        if (provider_id === req.userId) {
            return res.status(401).json({ error: message('provider-cant-be-user') })
        }

        // Check past dates
        const hourStart = startOfHour(parseISO(date))

        if (isBefore(hourStart, new Date())) {
            return res.status(400).json({ error: message('past-date') })
        }

        // Check date availability
        if (!await Appointment.isAvailable(provider_id, hourStart)) {
            return res.status(400).json({ error: message('date-not-available') })
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date,
        })

        return res.json(appointment)
    }
}

export default new AppointmentController()
