import message from '../messages'
import User from '../models/User'
import Queue from '../../queue/'
import Appointment from '../models/Appointment'
import { extenseFormat } from '../../util/date'
import Notification from '../schemas/Notification'
import CancellationMail from '../jobs/CancellationMail'
import { AppointmentCreateSchema } from '../validations/AppointmentValidation'
import { startOfHour, parseISO, isBefore, isValid, subHours } from 'date-fns'

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

        const parsedDate = parseISO(date)

        if (!isValid(parsedDate)) {
            return res.status(400).json({ error: message('invalid-date') })
        }

        if (provider_id === req.userId) {
            return res.status(401).json({ error: message('provider-cant-be-user') })
        }

        // Check past dates
        const hourStart = startOfHour(parsedDate)

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

        const user = await User.findByPk(req.userId)

        const formattedDate = extenseFormat(hourStart)

        // Send notification for provider
        await Notification.create({
            content: `Novo agendamento de ${user.name} para o dia ${formattedDate}`,
            user: provider_id,
        })

        return res.json(appointment)
    }

    async delete (req, res) {
        const appointment = await Appointment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name', 'email'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name'],
                },
            ],
        })

        if (!appointment) {
            return res.json({ error: message('appointment-not-found') })
        }

        if (req.userId !== appointment.user_id) {
            return res.json({ error: message('no-permission') })
        }

        const untilDate = subHours(appointment.date, 2)

        if (isBefore(untilDate, new Date())) {
            return res.json({ error: message('2-hours-in-advance') })
        }

        // Send email notifying cancellation
        Queue.add(CancellationMail.key, { appointment })

        appointment.canceled_at = new Date()
        await appointment.save()

        return res.json(appointment)
    }
}

export default new AppointmentController()
