import * as Yup from 'yup'

export const LoginSchema = Yup.object({
    email: Yup
        .string()
        .email()
        .required(),
    
    password: Yup
        .string()
        .min(6)
        .required()
        .strict(true)
        .typeError('Must be a string')
})