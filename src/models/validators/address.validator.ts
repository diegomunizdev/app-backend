import * as yup from 'yup'

export const ValidateAddress = yup.object().shape({
    zip_code: yup.string().required(),
    name: yup.string().required(),
    complement: yup.string(),
    number: yup.string().required(),
    neighborhood: yup.string().required(),
    city: yup.string().required(),
    uf: yup.string().required(),
    user_id: yup.string().required()
})