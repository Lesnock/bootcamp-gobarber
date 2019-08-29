import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'

export function extenseFormat (date) {
    return format(date, "dd 'de' MMMM 'às' H:mm'h'", { locale: pt })
}
