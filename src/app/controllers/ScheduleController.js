import User from '../models/User'
import message from '../messages'
import Appointment from '../models/Appointment'

class ScheduleController {
    async index (req, res) {
        if (!await User.isProvider(req.userId)) {
            return res.status(401).json({ error: message('no-permission') })
        }

        const appointments = await Appointment.findAllByDate(req.userId, req.query.date)

        return res.json(appointments)
    }
}

export default new ScheduleController()
