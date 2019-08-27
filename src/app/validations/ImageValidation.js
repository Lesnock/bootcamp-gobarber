import * as Yup from 'yup'

export const StoreImageSchema = Yup.object({
    mimetype: Yup
        .string()
        .oneOf([
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/gif',
        ]),
})
