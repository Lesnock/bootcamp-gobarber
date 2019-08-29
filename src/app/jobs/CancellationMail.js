import Mail from '../../mail'
import { parseISO } from 'date-fns'
import { extenseFormat } from '../../util/date'

class CancellationMail {
    get key () {
        return 'CancellationMail'
    }

    async handle ({ data }) {
        const { appointment } = data

        await Mail.send({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Agendamento cancelado',
            template: 'cancellation',
            context: {
                providerName: appointment.provider.name,
                userName: appointment.user.name,
                date: extenseFormat(parseISO(appointment.date)),
            },
        })
    }
}

export default new CancellationMail()
