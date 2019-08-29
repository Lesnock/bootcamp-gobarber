import User from '../models/User'
import message from '../messages'
import Notification from '../schemas/Notification'

class NotificationController {
    async index (req, res) {
        if (!await User.isProvider(req.userId)) {
            return res.status(401).json({ error: message('no-permission') })
        }

        const notifications = await Notification.find({ user: req.userId })
            .sort({ createdAt: 'desc' })
            .limit(20)

        return res.json(notifications)
    }

    async update (req, res) {
        if (!await User.isProvider(req.userId)) {
            return res.status(401).json({ error: message('no-permission') })
        }

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true },
        )

        if (!notification) {
            return res.json({ error: message('notification-not-found') })
        }

        return res.json(notification)
    }
}

export default new NotificationController()
