import * as yup from 'yup'

export const ValidateAddress = yup.object().shape({
    zip_code: yup.string().required('Inform the zip code'),
    name: yup.string(),
    complement: yup.string(),
    number: yup.string().required('Inform the number'),
    neighborhood: yup.string(),
    city: yup.string(),
    uf: yup.string(),
    user_id: yup.string().required('Inform the user')
})