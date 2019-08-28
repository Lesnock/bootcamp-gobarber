import * as Yup from 'yup'

export const AppointmentCreateSchema = Yup.object({
    date: Yup
        .date()
        .required(),

    provider_id: Yup
        .number()
        .required(),
})
