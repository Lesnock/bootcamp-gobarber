import * as Yup from 'yup'

//Create
export const UserCreateSchema = Yup.object({
    name: Yup
        .string()
        .required(),
    
    email: Yup
        .string()
        .email()
        .required(),
    
    password: Yup   
        .string()
        .required()
        .min(6),

    provider: Yup
        .boolean()
        .default(false)
})

//Update
export const UserUpdateSchema = Yup.object({
    name: Yup
        .string(),
    
    email: Yup
        .string()
        .email(),

    oldPassword: Yup
        .string()
        .min(6),
    
    password: Yup   
        .string()
        .min(6)
        .when('oldPassword', (oldPassword, password) => {
            return oldPassword ? password.required() : password
        }),
    
    confirmPassword: Yup
        .string()
        .when('password', (password, confirmPassword) => {
            return password 
                ? confirmPassword.required().oneOf([ Yup.ref('password') ])
                : confirmPassword
        }),

    provider: Yup
        .boolean()
        .default(false)
})